import { http, USE_MOCK } from '../lib/request';
import type { Post } from '../data/mockData';
import { MOCK_POSTS } from '../data/mockData';

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
 * 直接 return MOCK_POSTS。
 */
export async function listPosts(): Promise<Post[]> {
  if (USE_MOCK) return MOCK_POSTS.slice();
  return http.get<Post[]>('/posts');
}

/**
 * 创建帖子
 * 真实后端：POST /posts -> Post
 *
 * --- 原本地逻辑 ---
 * const newPost: Post = {
 *   id: `p${Date.now()}`,
 *   userId: currentUser.id,
 *   username: currentUser.username,
 *   content, images,
 *   likes: 0, comments: 0,
 *   time: new Date().toLocaleString(),
 *   status: '已通过',
 * };
 * setPosts(prev => [newPost, ...prev]);
 */
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  if (USE_MOCK) {
    return {
      id: `p${Date.now()}`,
      userId: payload.userId,
      username: payload.username,
      content: payload.content,
      images: payload.images,
      likes: 0,
      comments: 0,
      time: new Date().toLocaleString(),
      status: '已通过',
    };
  }
  return http.post<Post>('/posts', payload);
}

/**
 * 删除帖子
 * 真实后端：DELETE /posts/:id
 *
 * --- 原本地逻辑 ---
 * setPosts(prev => prev.filter(p => p.id !== postId))
 */
export async function deletePost(id: string): Promise<void> {
  if (USE_MOCK) return;
  return http.del<void>(`/posts/${id}`);
}

/**
 * 点赞 / 取消点赞
 * 真实后端：POST /posts/:id/like -> { likes: number }
 *
 * --- 原本地逻辑 ---
 * 在 Context 中 likes + 1。
 */
export async function likePost(id: string): Promise<{ likes: number }> {
  if (USE_MOCK) return { likes: -1 }; // -1 表示让上层使用本地累加
  return http.post<{ likes: number }>(`/posts/${id}/like`);
}
