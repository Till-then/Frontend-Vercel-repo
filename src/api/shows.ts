import { http, USE_MOCK } from '../lib/request';
import type { Show } from '../data/mockData';
import { SHOWS } from '../data/mockData';

export interface ShowQuery {
  city?: string;
  type?: Show['type'];
  keyword?: string;
}

/**
 * 演出列表
 * 真实后端：GET /shows
 *
 * --- 原本地逻辑（保留为测试方案） ---
 * 直接 return SHOWS（来自 src/data/mockData.ts），上层组件自行 filter。
 */
export async function listShows(query?: ShowQuery): Promise<Show[]> {
  if (USE_MOCK) {
    let data = SHOWS.slice();
    if (query?.city) data = data.filter((s) => s.city === query.city);
    if (query?.type) data = data.filter((s) => s.type === query.type);
    if (query?.keyword) {
      const k = query.keyword.toLowerCase();
      data = data.filter(
        (s) =>
          s.title.toLowerCase().includes(k) ||
          s.artist.toLowerCase().includes(k)
      );
    }
    return data;
  }
  return http.get<Show[]>('/shows', query as Record<string, string | undefined>);
}

/**
 * 演出详情
 * 真实后端：GET /shows/:id
 *
 * --- 原本地逻辑 ---
 * SHOWS.find(s => s.id === id)
 */
export async function getShow(id: string): Promise<Show | undefined> {
  if (USE_MOCK) return SHOWS.find((s) => s.id === id);
  return http.get<Show>(`/shows/${id}`);
}

/**
 * 创建演出（后台）
 * 真实后端：POST /admin/shows
 *
 * --- 原本地逻辑 ---
 * 直接 setShows(prev => [...prev, newShow])
 */
export async function createShow(payload: Omit<Show, 'id'>): Promise<Show> {
  if (USE_MOCK) return { ...payload, id: `s${Date.now()}` };
  return http.post<Show>('/admin/shows', payload);
}

/**
 * 更新演出（后台）
 * 真实后端：PUT /admin/shows/:id
 */
export async function updateShow(id: string, payload: Partial<Show>): Promise<Show> {
  if (USE_MOCK) return { ...(payload as Show), id };
  return http.put<Show>(`/admin/shows/${id}`, payload);
}

/**
 * 删除演出（后台）
 * 真实后端：DELETE /admin/shows/:id
 */
export async function deleteShow(id: string): Promise<void> {
  if (USE_MOCK) return;
  return http.del<void>(`/admin/shows/${id}`);
}
