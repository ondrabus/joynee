import { getAuth } from 'firebase/auth';
import { DataProvider } from 'react-admin';
import { authProvider } from './authProvider';

// Types for API responses
interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  timestamp: string;
}

interface ListResponse<T> {
  data: T[];
  total: number;
}

interface SingleResponse<T> {
  data: T;
}

// Helper function to get authentication headers
const getAuthHeaders = async (): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    const idToken = await authProvider.getJWTToken()
    headers['Authorization'] = `Bearer ${idToken}`;
  } catch (error) {
    console.warn('Failed to get Firebase ID token:', error);
  }

  return headers;
};

// Helper function to make API requests
const makeApiRequest = async <T>(
  url: string, 
  options: RequestInit = {}
): Promise<T> => {
  const headers = await getAuthHeaders();
  
  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
  }

  return response.json();
};

// Remove server-managed fields from outgoing payloads for ALL resources
const sanitizeOutgoingData = (data: any): any => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data;
  const { id, createdAt, updatedAt, ...rest } = data;
  return rest;
};

// Helper function to filter data for specific resources
const filterUpdateData = (resource: string, data: any): any => {
  switch (resource) {
    case 'hashtags':
      return { text: data.text };
    case 'bubbles':
      return {
        name: data.name,
        lang: data.lang,
        type: data.type,
        active: data.active
      };
    case 'accounts':
      return {
        name: data.name,
        active: data.active
      };
    default:
      return data;
  }
};

// Custom data provider for Joynee API
export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const queryParams = new URLSearchParams();
    
    // Add pagination parameters
    if (params.pagination) {
      queryParams.append('page', params.pagination.page.toString());
      queryParams.append('limit', params.pagination.perPage.toString());
    }
    
    // Add sorting parameters
    if (params.sort) {
      queryParams.append('sortBy', params.sort.field);
      queryParams.append('sortOrder', params.sort.order.toLowerCase());
    }
    
    // Add filter parameters
    if (params.filter && Object.keys(params.filter).length > 0) {
      queryParams.append('search', JSON.stringify(params.filter));
    }
    
    const url = `http://localhost:3000/api/${resource}?${queryParams.toString()}`;
    const response = await makeApiRequest<ApiResponse<any[]>>(url);
    
    return {
      data: response.data || [],
      total: response.pagination?.total || response.data.length
    };
  },

  getOne: async (resource, params) => {
    const url = `http://localhost:3000/api/${resource}/${params.id}`;
    const response = await makeApiRequest<ApiResponse<any>>(url);
    
    return {
      data: response.data
    };
  },

  create: async (resource, params) => {
    const url = `http://localhost:3000/api/${resource}`;
    const body = JSON.stringify(sanitizeOutgoingData(params.data));
    const response = await makeApiRequest<ApiResponse<any>>(url, {
      method: 'POST',
      body
    });
    
    return {
      data: response.data
    };
  },

  update: async (resource, params) => {
    const url = `http://localhost:3000/api/${resource}/${params.id}`;
    const filteredData = filterUpdateData(resource, params.data);
    const body = JSON.stringify(sanitizeOutgoingData(filteredData));
    
    const response = await makeApiRequest<ApiResponse<any>>(url, {
      method: 'PATCH',
      body
    });
    
    return {
      data: response.data
    };
  },

  delete: async (resource, params) => {
    const url = `http://localhost:3000/api/${resource}/${params.id}`;
    const response = await makeApiRequest<ApiResponse<any>>(url, {
      method: 'DELETE'
    });
    
    return {
      data: response.data
    };
  },

  // Use simple REST provider for other methods
  getMany: async (resource, params) => {
    const promises = params.ids.map(id => 
      makeApiRequest<ApiResponse<any>>(`http://localhost:3000/api/${resource}/${id}`)
    );
    
    const responses = await Promise.all(promises);
    return {
      data: responses.map(response => response.data)
    };
  },

  getManyReference: async (resource, params) => {
    const queryParams = new URLSearchParams();
    queryParams.append('filter', JSON.stringify({ [params.target]: params.id }));
    
    if (params.pagination) {
      queryParams.append('page', params.pagination.page.toString());
      queryParams.append('limit', params.pagination.perPage.toString());
    }
    
    const url = `http://localhost:3000/api/${resource}?${queryParams.toString()}`;
    const response = await makeApiRequest<ApiResponse<any[]>>(url);
    
    return {
      data: response.data || [],
      total: response.pagination?.total || response.data.length
    };
  },

  updateMany: async (resource, params) => {
    const promises = params.ids.map(id => {
      const url = `http://localhost:3000/api/${resource}/${id}`;
      const filteredData = filterUpdateData(resource, params.data);
      const body = JSON.stringify(sanitizeOutgoingData(filteredData));
      
      return makeApiRequest<ApiResponse<any>>(url, {
        method: 'PATCH',
        body
      });
    });
    
    const responses = await Promise.all(promises);
    return {
      data: responses.map(response => response.data)
    };
  },

  deleteMany: async (resource, params) => {
    const promises = params.ids.map(id => {
      const url = `http://localhost:3000/api/${resource}/${id}`;
      return makeApiRequest<ApiResponse<any>>(url, {
        method: 'DELETE'
      });
    });
    
    const responses = await Promise.all(promises);
    return {
      data: responses.map(response => response.data)
    };
  }
};
