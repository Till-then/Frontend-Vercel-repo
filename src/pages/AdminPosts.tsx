
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 管理后台 (Admin Service) ===
 * GET    /api/admin/posts         - 获取待审核帖子列表
 * PUT    /api/admin/posts/:id/approve    - 审核通过帖子
 * PUT    /api/admin/posts/:id/reject     - 审核拒绝帖子
 * DELETE /api/posts/:id           - 删除动态
 */

import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  MessageSquare,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { Post } from '../data/mockData';
// --- 原本地逻辑（保留为注释，便于回退） ---
// import { MOCK_POSTS } from '../data/mockData';
import * as postsApi from '../api/posts';
import { toast } from 'sonner';

const AdminPosts: React.FC = () => {
  // 真实后端：帖子列表 / 审核 / 删除均走 /posts、/admin/posts/:id/approve|reject
  // --- 原本地逻辑 ---
  // const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    postsApi
      .listPosts()
      .then(setPosts)
      .catch(() => {
        // --- 原本地逻辑 ---
        // setPosts(MOCK_POSTS);
        setPosts([]);
        toast.error('加载帖子列表失败');
      });
  }, []);

  const handleStatusChange = async (id: string, newStatus: '已通过' | '已拒绝') => {
    const snapshot = posts;
    // 乐观更新
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    try {
      // --- 原本地逻辑 ---
      // setPosts(posts.map(p => p.id === id ? { ...p, status: newStatus } : p));
      if (newStatus === '已通过') await postsApi.approvePost(id);
      else await postsApi.rejectPost(id);
    } catch {
      setPosts(snapshot);
      toast.error('审核失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要彻底删除这条帖子吗？')) {
      const snapshot = posts;
      setPosts(prev => prev.filter(p => p.id !== id));
      try {
        // --- 原本地逻辑 ---
        // setPosts(posts.filter(p => p.id !== id));
        await postsApi.deletePost(id);
      } catch {
        setPosts(snapshot);
        toast.error('删除失败');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">帖子管理</h1>
        <p className="text-gray-500 mt-1">审核用户发布的社交动态，维护社区健康氛围。</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{post.username}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {post.time}
                    </p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  post.status === '已通过' ? 'bg-emerald-100 text-emerald-600' :
                  post.status === '待审核' ? 'bg-amber-100 text-amber-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {post.status}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
              {post.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {post.images.map((img, i) => (
                    <img key={i} src={img} alt="Post" className="w-24 h-24 object-cover rounded-lg border border-gray-100" />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  {post.comments} 评论
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle size={14} />
                  {post.likes} 点赞
                </span>
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t md:border-t-0 md:border-l border-gray-100 flex md:flex-col justify-center gap-3">
              {post.status === '待审核' && (
                <>
                  <button 
                    onClick={() => handleStatusChange(post.id, '已通过')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <CheckCircle size={18} />
                    通过
                  </button>
                  <button 
                    onClick={() => handleStatusChange(post.id, '已拒绝')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-red-500 font-bold rounded-xl border border-red-100 hover:bg-red-50 transition-all"
                  >
                    <XCircle size={18} />
                    拒绝
                  </button>
                </>
              )}
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-600 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                <Eye size={18} />
                详情
              </button>
              <button 
                onClick={() => handleDelete(post.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-400 hover:text-red-500 font-bold rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-100 transition-all"
              >
                <Trash2 size={18} />
                删除
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="bg-white p-20 rounded-2xl border border-dashed border-gray-200 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 font-medium">暂无待审核帖子</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPosts;
