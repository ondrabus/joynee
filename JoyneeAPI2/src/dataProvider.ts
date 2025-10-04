import simpleRestProvider from 'ra-data-simple-rest';
import { auth } from './config/firebase';

// Helper function to filter out undefined values from update data
const filterUpdateData = (data: any) => {
  const filtered: any = {};
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      filtered[key] = data[key];
    }
  });
  return filtered;
};

const httpClient = async (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  
  if (options.body && !options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', 'application/json');
  }
  
  // Add Authorization header with Firebase ID token
  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      const idToken = await currentUser.getIdToken();
      options.headers.set('Authorization', `Bearer ${idToken}`);
    } catch (error) {
      console.warn('Failed to get Firebase ID token:', error);
    }
  }
  
  console.log('🔍 HTTP Request Headers:', {
    url,
    method: options.method || 'GET',
    hasAuthorization: options.headers.has('Authorization'),
    authorizationValue: options.headers.get('Authorization')?.substring(0, 20) + '...' || 'None'
  });
  
  return fetch(url, options).then(response => {
    if (!response.ok) {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        body: response.text(),
      });
    }
    return response.json();
  });
};

// Create the data provider
const dataProvider = simpleRestProvider('http://localhost:3000/api', httpClient);

// Override create and update methods to ensure they return the correct format
const customDataProvider = {
  ...dataProvider,
  
  create: async (resource: string, params: any) => {
    const response = await dataProvider.create(resource, params);
    return { data: response.json || {} };
  },
  
  update: async (resource: string, params: any) => {
    const response = await dataProvider.update(resource, params);
    return { data: response.json || {} };
  }
};

export { customDataProvider as dataProvider }; 