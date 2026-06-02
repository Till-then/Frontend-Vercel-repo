import { http } from '../lib/request';
import type { UserData } from '../data/mockData';

// --- 原本地逻辑依赖（保留为注释） ---
// import { USE_MOCK } from '../lib/request';
// import { MOCK_USERS } from '../data/mockData';

/**
 * 用户列表（后台）
 * 真实后端：GET /admin/users
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return MOCK_USERS.slice();
 */
export async function listUsers(): Promise<UserData[]> {
  return http.get<UserData[]>('/admin/users');
}

/**
 * 切换用户启用 / 禁用状态（后台）
 * 真实后端：PUT /admin/users/:id/status -> UserData
 */
export async function updateUserStatus(
  id: number,
  status: '正常' | '禁用'
): Promise<UserData> {
  return http.put<UserData>(`/admin/users/${id}/status`, { status });
}

/**
 * 关注 / 取消关注
 * 真实后端：POST /users/:id/follow / DELETE /users/:id/follow
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return;
 */
export async function follow(userId: number): Promise<void> {
  await http.post<void>(`/users/${userId}/follow`);
}

export async function unfollow(userId: number): Promise<void> {
  await http.del<void>(`/users/${userId}/follow`);
}

/**
 * 我的关注 / 粉丝列表
 * 真实后端：GET /users/me/following | /users/me/followers
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return [101]; / return [102];
 */
export async function listFollowing(): Promise<number[]> {
  return http.get<number[]>('/users/me/following');
}

export async function listFollowers(): Promise<number[]> {
  return http.get<number[]>('/users/me/followers');
}

/**
 * 获取多个用户的资料（用于"我的关注 / 粉丝"详细信息展示）
 * 真实后端：GET /users?ids=1,2,3 -> UserData[]
 */
export async function listUsersByIds(ids: number[]): Promise<UserData[]> {
  if (!ids || ids.length === 0) return [];
  return http.get<UserData[]>('/users', { ids: ids.join(',') });
}
