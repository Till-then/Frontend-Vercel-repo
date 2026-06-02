import { http } from '../lib/request';
import type { Venue } from '../data/mockData';

// --- 原本地逻辑依赖（保留为注释，便于回退到 mock 数据） ---
// import { USE_MOCK } from '../lib/request';
// import { VENUES } from '../data/mockData';

export interface VenueQuery {
  city?: string;
  keyword?: string;
}

/**
 * 场馆列表
 * 真实后端：GET /venues
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) {
 *   let data = VENUES.slice();
 *   if (query?.city) data = data.filter((v) => v.city === query.city);
 *   if (query?.keyword) {
 *     const k = query.keyword.toLowerCase();
 *     data = data.filter(
 *       (v) =>
 *         v.name.toLowerCase().includes(k) || v.address.toLowerCase().includes(k)
 *     );
 *   }
 *   return data;
 * }
 */
export async function listVenues(query?: VenueQuery): Promise<Venue[]> {
  return http.get<Venue[]>('/venues', query as Record<string, string | undefined>);
}

/**
 * 场馆详情
 * 真实后端：GET /venues/:id
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return VENUES.find((v) => v.id === id);
 */
export async function getVenue(id: string): Promise<Venue | undefined> {
  return http.get<Venue>(`/venues/${id}`);
}

/**
 * 创建场馆（后台）
 * 真实后端：POST /admin/venues
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return { ...payload, id: `v${Date.now()}` };
 */
export async function createVenue(payload: Omit<Venue, 'id'>): Promise<Venue> {
  return http.post<Venue>('/admin/venues', payload);
}

/**
 * 更新场馆（后台）
 * 真实后端：PUT /admin/venues/:id
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return { ...(payload as Venue), id };
 */
export async function updateVenue(id: string, payload: Partial<Venue>): Promise<Venue> {
  return http.put<Venue>(`/admin/venues/${id}`, payload);
}

/**
 * 删除场馆（后台）
 * 真实后端：DELETE /admin/venues/:id
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return;
 */
export async function deleteVenue(id: string): Promise<void> {
  return http.del<void>(`/admin/venues/${id}`);
}
