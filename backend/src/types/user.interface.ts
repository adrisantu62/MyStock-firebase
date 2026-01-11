export interface AuthUser {
  uid: string;
  email?: string;
  role?: 'user' | 'admin';
}
