import { http, USE_MOCK } from '../lib/request';
import type { Venue } from '../data/mockData';
import { VENUES } from '../data/mockData';

export interface VenueQuery {
  city?: string;
  keyword?: string;
}

/**
 * 场馆列表
 * 真实后端：GET /venues
 *
 * --- 原本地逻辑 ---
 * 直接 return VENUES，组件自行 filter。
 */
export async function listVenues(query?: VenueQuery): Promise<Venue[]> {
  if (USE_MOCK) {
    let data = VENUES.slice();
    if (query?.city) data = data.filter((v) => v.city === query.city);
    if (query?.keyword) {
      const k = query.keyword.toLowerCase();
      data = data.filter(
        (v) =>
          v.name.toLowerCase().includes(k) || v.address.toLowerCase().includes(k)
      );
    }
    return data;
  }
  return http.get<Venue[]>('/venues', query as Record<string, string | undefined>);
}

/**
 * 场馆详情
 * 真实后端：GET /venues/:id
 *
 * --- 原本地逻辑 ---
 * VENUES.find(v => v.id === id)
 */
export async function getVenue(id: string): Promise<Venue | undefined> {
  if (USE_MOCK) return VENUES.find((v) => v.id === id);
  return http.get<Venue>(`/venues/${id}`);
}

export async function createVenue(payload: Omit<Venue, 'id'>): Promise<Venue> {
  if (USE_MOCK) return { ...payload, id: `v${Date.now()}` };
  return http.post<Venue>('/admin/venues', payload);
}

export async function updateVenue(id: string, payload: Partial<Venue>): Promise<Venue> {
  if (USE_MOCK) return { ...(payload as Venue), id };
  return http.put<Venue>(`/admin/venues/${id}`, payload);
}

export async function deleteVenue(id: string): Promise<void> {
  if (USE_MOCK) return;
  return http.del<void>(`/admin/venues/${id}`);
}
