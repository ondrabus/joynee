import { AuthProvider } from 'react-admin';
import { FirebaseAuthProvider } from 'react-admin-firebase';

const config = {
  apiKey: "AIzaSyAgOo3UUaJbeLey6omQZh3yfvSvWlUbOVQ",
  authDomain: "joynee-5ceb6.firebaseapp.com",
  projectId: "joynee-5ceb6",
};

// Base provider from react-admin-firebase
const base: any = FirebaseAuthProvider(config, {});

function extractRolesFromClaims(claims: any): string[] {
  const roles: string[] = Array.isArray(claims?.roles)
    ? claims.roles
    : (typeof claims?.roles === 'string' ? claims.roles.split(',').map((r: string) => r.trim()) : []);
  if (claims?.admin && !roles.includes('admin')) roles.push('admin');
  if (claims?.superadmin && !roles.includes('superadmin')) roles.push('superadmin');
  return roles;
}

export const authProvider: AuthProvider = {
  ...base,
  async login(params: any) {
    await base.login(params);
    return authProvider.checkAuth(params);
  },
  async checkAuth(params?: any) {
    const user = await base.checkAuth(params);
    if (!user) return Promise.reject();
    const token = await user.getIdTokenResult(true);
    const roles = extractRolesFromClaims(token.claims || {});
    if (!roles.includes('admin') && !roles.includes('superadmin')) {
      await base.logout(params);
      return Promise.reject();
    }
    return Promise.resolve();
  },
  async getPermissions(params?: any) {
    try {
      const user = await base.checkAuth(params);
      if (!user) return [] as any;
      const token = await user.getIdTokenResult();
      return extractRolesFromClaims(token.claims || {}) as any;
    } catch {
      return [] as any;
    }
  },
}; 