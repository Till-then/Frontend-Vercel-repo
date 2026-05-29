import { http, USE_MOCK } from '../lib/request';
import type { UserData } from '../data/mockData';
import { MOCK_USERS } from '../data/mockData';

/**
 * 用户列表（后台）
 * 真实后端：GET /admin/users
 *
 * --- 原本地逻辑 ---
 * 直接 return MOCK_USERS。
 */
export async function listUsers(): Promise<UserData[]> {
  if (USE_MOCK) return MOCK_USERS.slice();
  return http.get<UserData[]>('/admin/users');
}

/**
 * 关注 / 取消关注
 * 真实后端：POST /users/:id/follow / DELETE /users/:id/follow
 *
 * --- 原本地逻辑 ---
 * 在 Context 中切换 following 数组。
 */
export async function follow(userId: number): Promise<void> {
  if (USE_MOCK) return;
  await http.post<void>(`/users/${userId}/follow`);
}

export async function unfollow(userId: number): Promise<void> {
  if (USE_MOCK) return;
  await http.del<void>(`/users/${userId}/follow`);
}

/**
 * 我的关注 / 粉丝列表
 * 真实后端：GET /users/me/following | /users/me/followers
 *
 * --- 原本地逻辑 ---
 * Context 中 following = [101], followers = [102]。
 */
export async function listFollowing(): Promise<number[]> {
  if (USE_MOCK) return [101];
  return http.get<number[]>('/users/me/following');
}

export async function listFollowers(): Promise<number[]> {
  if (USE_MOCK) return [102];
  return http.get<number[]>('/users/me/followers');
}
