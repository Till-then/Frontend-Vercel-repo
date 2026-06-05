import { http } from '../lib/request';

export async function addCollection(performanceId: string): Promise<void> {
  return http.post<void>('/api/collections', { performanceId });
}

export async function removeCollection(performanceId: string): Promise<void> {
  return http.del<void>(`/api/collections/${performanceId}`);
}
