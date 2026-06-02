import { http } from '../lib/request';
import type { Post } from '../data/mockData';

// --- 原本地逻辑依赖（保留为注释） ---
// import { USE_MOCK } from '../lib/request';
// import { MOCK_POSTS } from '../data/mockData';

export interface CreatePostPayload {
  userId: number;
  username: string;
  content: string;
  images: string[];
}

/**
 * 帖子列表
 * 真实后端：GET /posts
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return MOCK_POSTS.slice();
 */
export async function listPosts(): Promise<Post[]> {
  return http.get<Post[]>('/posts');
}

/**
 * 创建帖子
 * 真实后端：POST /posts -> Post
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) {
 *   return {
 *     id: `p${Date.now()}`,
 *     userId: payload.userId,
 *     username: payload.username,
 *     content: payload.content,
 *     images: payload.images,
 *     likes: 0,
 *     comments: 0,
 *     time: new Date().toLocaleString(),
 *     status: '已通过',
 *   };
 * }
 */
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  return http.post<Post>('/posts', payload);
}

/**
 * 删除帖子
 * 真实后端：DELETE /posts/:id
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return;
 */
export async function deletePost(id: string): Promise<void> {
  return http.del<void>(`/posts/${id}`);
}

/**
 * 点赞 / 取消点赞
 * 真实后端：POST /posts/:id/like -> { likes: number }
 *
 * --- 原本地逻辑 ---
 * if (USE_MOCK) return { likes: -1 }; // -1 表示让上层使用本地累加
 */
export async function likePost(id: string): Promise<{ likes: number }> {
  return http.post<{ likes: number }>(`/posts/${id}/like`);
}

/**
 * 帖子审核（后台）
 * 真实后端：PUT /admin/posts/:id/approve  /  PUT /admin/posts/:id/reject
 */
export async function approvePost(id: string): Promise<Post> {
  return http.put<Post>(`/admin/posts/${id}/approve`);
}

export async function rejectPost(id: string): Promise<Post> {
  return http.put<Post>(`/admin/posts/${id}/reject`);
}
