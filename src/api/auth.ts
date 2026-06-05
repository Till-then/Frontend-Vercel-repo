import { http, tokenStore } from '../lib/request';
import type { User } from '../context/AppContext';

export interface LoginPayload {
  userAccount: string;
  userPassword: string;
}

export interface RegisterPayload {
  userAccount: string;
  userPassword: string;
  checkPassword: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

export async function login(payload: LoginPayload): Promise<AuthResult> {
  const result = await http.post<any>('/api/user/login', payload);

  // 处理不同的响应格式
  let user, token;

  if (result.user && result.token) {
    user = result.user;
    token = result.token;
  } else if (result.data) {
    user = result.data.user || result.data;
    token = result.data.token;
  } else {
    user = result;
    token = result.token || '';
  }

  if (token) {
    tokenStore.set(token);
  }

  return { user, token };
}

export async function register(payload: RegisterPayload): Promise<AuthResult> {
  const result = await http.post<any>('/api/user/register', payload);

  // 处理不同的响应格式
  let user, token;

  if (result.user && result.token) {
    user = result.user;
    token = result.token;
  } else if (result.data) {
    user = result.data.user || result.data;
    token = result.data.token;
  } else {
    user = result;
    token = result.token || '';
  }

  if (token) {
    tokenStore.set(token);
  }

  return { user, token };
}

export async function logout(): Promise<void> {
  try {
    await http.post('/api/user/logout');
  } finally {
    tokenStore.clear();
  }
}

export async function getLoginUser(): Promise<User> {
  return http.get<User>('/api/user/get/login');
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  return http.post<User>('/api/user/update/my', data);
}
