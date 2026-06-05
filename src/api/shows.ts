import { http } from '../lib/request';
import type { Show } from '../data/mockData';

export interface ShowQuery {
  city?: string;
  type?: string;
  keyword?: string;
  page?: number;
  size?: number;
}

// 后端字段 → 前端 Show 字段映射
function mapPerformance(p: any): Show {
  return {
    id: String(p.performanceId ?? p.id),
    title: p.title,
    artist: p.singer ?? p.artist ?? '',
    date: p.startTime ?? p.date ?? '',
    venue: p.venue ?? '',
    city: p.city ?? '',
    type: mapType(p.type),
    price: p.price ?? 0,
    status: p.status === 0 ? '已售罄' : (p.status === 2 ? '即将开票' : '售票中'),
    image: p.posterUrl ?? p.image ?? '',
    description: p.description ?? '',
    venueId: String(p.venueId ?? ''),
    ticketUrl: p.ticketUrl,
  } as Show;
}

function mapType(t: string): Show['type'] {
  const map: Record<string, Show['type']> = {
    Concert: '演唱会',
    LiveHouse: 'Livehouse',
    MusicFestival: '音乐节',
  };
  return map[t] ?? (t as Show['type']) ?? '演唱会';
}

export async function listShows(query?: ShowQuery): Promise<Show[]> {
  const res = await http.get<any>('/api/performances', query as Record<string, any>);
  const list = Array.isArray(res) ? res : (res?.list ?? res?.records ?? []);
  return list.map(mapPerformance);
}

export async function getShow(id: string): Promise<Show | undefined> {
  const p = await http.get<any>(`/api/performances/${id}`);
  return p ? mapPerformance(p) : undefined;
}

export async function createShow(payload: Omit<Show, 'id'>): Promise<Show> {
  const p = await http.post<any>('/api/performances', mapToBackend(payload));
  return mapPerformance(p);
}

export async function updateShow(id: string, payload: Partial<Show>): Promise<Show> {
  const p = await http.put<any>(`/api/performances/${id}`, mapToBackend(payload));
  return mapPerformance(p);
}

export async function deleteShow(id: string): Promise<void> {
  return http.del<void>(`/api/performances/${id}`);
}

function mapToBackend(s: Partial<Show>): Record<string, unknown> {
  const typeMap: Record<string, string> = {
    '演唱会': 'Concert',
    'Livehouse': 'LiveHouse',
    '音乐节': 'MusicFestival',
  };
  return {
    title: s.title,
    singer: s.artist,
    startTime: s.date,
    venue: s.venue,
    city: s.city,
    type: s.type ? (typeMap[s.type] ?? s.type) : undefined,
    price: s.price,
    posterUrl: s.image,
    description: s.description,
    venueId: s.venueId,
  };
}
