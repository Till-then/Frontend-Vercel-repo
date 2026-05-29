/**
 * 统一请求封装
 * - 自动拼接 VITE_API_BASE
 * - 自动附加 Authorization: Bearer <token>
 * - 统一 JSON 序列化与错误处理
 *
 * 使用 VITE_USE_MOCK=true 可以让上层 API 模块走本地 mock 分支，
 * 这样在没有真实后端时仍可以本地测试。
 */

export const API_BASE: string = import.meta.env.VITE_API_BASE || '';
export const USE_MOCK: boolean =
  (import.meta.env.VITE_USE_MOCK ?? 'true').toString().toLowerCase() === 'true';

const TOKEN_KEY = 'livejoy_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY) || '',
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: Method;
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  if (!query) return url;
  const usp = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) usp.append(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `${url}?${qs}` : url;
}

export async function request<T = unknown>(
  path: string,
  opts: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, query, headers = {}, signal } = opts;
  const token = tokenStore.get();

  const res = await fetch(buildUrl(path, query), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await res.json().catch(() => null) : await res.text();

  if (!res.ok) {
    const msg =
      (payload && typeof payload === 'object' && 'message' in payload
        ? (payload as { message?: string }).message
        : undefined) || `Request failed: ${res.status}`;
    throw new ApiError(msg, res.status, payload);
  }

  // 后端如果统一包装 { code, data, message }，可以在此解包
  if (payload && typeof payload === 'object' && 'data' in (payload as object)) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export const http = {
  get: <T = unknown>(path: string, query?: RequestOptions['query']) =>
    request<T>(path, { method: 'GET', query }),
  post: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body }),
  put: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body }),
  patch: <T = unknown>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body }),
  del: <T = unknown>(path: string) => request<T>(path, { method: 'DELETE' }),
};
