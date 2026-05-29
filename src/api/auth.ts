import { http, tokenStore, USE_MOCK } from '../lib/request';
import type { User } from '../context/AppContext';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  phone: string;
  email: string;
}

export interface AuthResult {
  user: User;
  token: string;
}

/**
 * 登录
 * 真实后端：POST /auth/login -> { user, token }
 *
 * --- 原本地测试逻辑（保留作 fallback / 单测参考） ---
 * if (username === 'admin' && password === 'admin123') {
 *   return {
 *     user: {
 *       id: 0, username: 'Admin', phone: '13800000000',
 *       email: 'admin@livejoy.com',
 *       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
 *       isLoggedIn: true, role: 'admin',
 *     },
 *     token: 'mock-admin-token',
 *   };
 * }
 * if (username && password.length >= 6) {
 *   return {
 *     user: {
 *       id: 1, username, phone: '13812345678',
 *       email: `${username}@example.com`,
 *       avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
 *       isLoggedIn: true, role: 'user',
 *     },
 *     token: 'mock-user-token',
 *   };
 * }
 * throw new Error('用户名或密码错误');
 */
export async function login(payload: LoginPayload): Promise<AuthResult> {
  if (USE_MOCK) {
    const { username, password } = payload;
    if (username === 'admin' && password === 'admin123') {
      const result: AuthResult = {
        user: {
          id: 0,
          username: 'Admin',
          phone: '13800000000',
          email: 'admin@livejoy.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
          isLoggedIn: true,
          role: 'admin',
        },
        token: 'mock-admin-token',
      };
      tokenStore.set(result.token);
      return result;
    }
    if (username && password.length >= 6) {
      const result: AuthResult = {
        user: {
          id: 1,
          username,
          phone: '13812345678',
          email: `${username}@example.com`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          isLoggedIn: true,
          role: 'user',
        },
        token: 'mock-user-token',
      };
      tokenStore.set(result.token);
      return result;
    }
    throw new Error('用户名或密码错误');
  }

  const result = await http.post<AuthResult>('/auth/login', payload);
  tokenStore.set(result.token);
  return result;
}

/**
 * 注册
 * 真实后端：POST /auth/register -> { user, token }
 *
 * --- 原本地测试逻辑 ---
 * return {
 *   user: {
 *     id: Date.now(), username: data.username, phone: data.phone,
 *     email: data.email,
 *     avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
 *     isLoggedIn: true, role: 'user',
 *   },
 *   token: 'mock-register-token',
 * };
 */
export async function register(payload: RegisterPayload): Promise<AuthResult> {
  if (USE_MOCK) {
    const result: AuthResult = {
      user: {
        id: Date.now(),
        username: payload.username,
        phone: payload.phone,
        email: payload.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${payload.username}`,
        isLoggedIn: true,
        role: 'user',
      },
      token: 'mock-register-token',
    };
    tokenStore.set(result.token);
    return result;
  }

  const result = await http.post<AuthResult>('/auth/register', payload);
  tokenStore.set(result.token);
  return result;
}

/**
 * 退出登录
 * 真实后端：POST /auth/logout
 *
 * --- 原本地逻辑 ---
 * 仅 setCurrentUser(null) 即可，无需请求。
 */
export async function logout(): Promise<void> {
  if (USE_MOCK) {
    tokenStore.clear();
    return;
  }
  try {
    await http.post('/auth/logout');
  } finally {
    tokenStore.clear();
  }
}

/**
 * 更新当前用户资料
 * 真实后端：PATCH /auth/me -> User
 *
 * --- 原本地逻辑 ---
 * 仅在 Context 内做 setCurrentUser({...prev, ...data})。
 */
export async function updateProfile(data: Partial<User>): Promise<User> {
  if (USE_MOCK) {
    return { ...(data as User) };
  }
  return http.patch<User>('/auth/me', data);
}
