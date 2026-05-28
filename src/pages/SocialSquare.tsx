
<<<<<<< HEAD
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Heart, Share2, Plus, Users, Ticket, Camera, Send, Search, TrendingUp, Music2, X, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'sonner';

const SocialSquare: React.FC = () => {
  const { currentUser, posts, addPost, deletePost, toggleLike, isFollowing, toggleFollow } = useAppContext();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    if (!currentUser) {
      toast.error('请先登录后发布动态');
      navigate('/login');
      return;
    }
    if (!content.trim() && images.length === 0) {
      toast.error('请输入内容或上传图片');
      return;
    }
    addPost(content, images);
    setContent('');
    setImages([]);
    toast.success('动态发布成功');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(https://modao.cc/agent-py/workspace/6a1553035894283edfa228c1/performance-guide-app_v4.react/src/pages/file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const filteredPosts = posts.filter(p => 
    p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
=======
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 社交模块 (Social Service) ===
 * GET    /api/posts               - 获取动态列表（支持分页）
 * POST   /api/posts               - 发布动态
 * POST   /api/posts/:id/like      - 点赞动态
 * DELETE /api/posts/:id/like      - 取消点赞
 * POST   /api/user/:id/follow     - 关注用户
 * DELETE /api/user/:id/follow     - 取消关注
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Heart, Share2, Plus, Users, Ticket, Camera, Send, Search, TrendingUp, Music2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SocialSquare: React.FC = () => {
  const { isFollowing, toggleFollow } = useAppContext();
  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 101,
      user: '音乐狂人',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music',
      content: '周杰伦南京站终于要来了！期待值拉满！有人一起拼车去奥体吗？',
      images: ['https://modao.cc/agent-py/media/generated_images/2026-05-26/85d7a08bb1914ada81e3e1d8f851a325.jpg#desc=JayChou'],
      likes: 120,
      comments: 45,
      time: '2小时前',
      tag: '演出期待'
    },
    {
      id: 2,
      userId: 102,
      user: 'Livehouse爱好者',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=live',
      content: '昨晚在万青的现场真的绝了，合肥站有人一起吗？',
      images: [],
      likes: 85,
      comments: 12,
      time: '5小时前',
      tag: '现场分享'
    }
  ]);
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Social Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-primary/5 p-12 rounded-[48px]">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-5xl font-black text-gray-900">LiveJoy 社区</h1>
          <p className="text-gray-500 text-lg">分享观演快乐，寻找志同道合的演出搭子</p>
          <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
            <Link to="/social/buddies" className="px-6 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2">
<<<<<<< HEAD
              <Users size={20} />找搭子
            </Link>
            <Link to="/social/tickets" className="px-6 py-3 bg-white text-gray-900 border border-gray-100 font-black rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Ticket size={20} />票务集市
=======
              <Users size={20} />
              找搭子
            </Link>
            <Link to="/social/tickets" className="px-6 py-3 bg-white text-gray-900 border border-gray-100 font-black rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Ticket size={20} />
              票务集市
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
            </Link>
          </div>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索话题、用户或动态..."
<<<<<<< HEAD
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
=======
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
            className="w-full h-16 pl-16 pr-6 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-primary/5 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
<<<<<<< HEAD
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                <img 
                  src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 space-y-4">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={currentUser ? "分享你的观演心得或寻找搭子..." : "请先登录后参与讨论"}
                  disabled={!currentUser}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary/20 transition-all resize-none h-32 text-lg"
                />
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(i)} className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <button onClick={() => fileInputRef.current?.click()} disabled={!currentUser} className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-bold">
                  <Camera size={20} /><span>图片</span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                <span className="text-xs text-gray-400 font-medium">{content.length}/500</span>
              </div>
              <button onClick={handlePost} disabled={!currentUser} className="px-10 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50">
                <Send size={18} />发布动态
=======
        {/* Left: Feed */}
        <div className="lg:col-span-8 space-y-8">
          {/* Post Input */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=current" alt="Avatar" className="w-full h-full rounded-full" />
              </div>
              <textarea 
                placeholder="分享你的观演心得或寻找搭子..."
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary/20 transition-all resize-none h-32"
              ></textarea>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <Camera size={20} />
                </button>
                <button className="p-3 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <Plus size={20} />
                </button>
              </div>
              <button className="px-8 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2">
                发布动态
                <Send size={18} />
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
              </button>
            </div>
          </div>

<<<<<<< HEAD
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`} alt="" className="w-full h-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-gray-900">{post.username}</h3>
                        {currentUser && post.userId !== currentUser.id && (
                          <button onClick={() => toggleFollow(post.userId)} className={`text-xs font-black px-2 py-0.5 rounded-md ${isFollowing(post.userId) ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                            {isFollowing(post.userId) ? '已关注' : '+ 关注'}
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-bold">{post.time}</p>
                    </div>
                  </div>
                  {currentUser && post.userId === currentUser.id && (
                    <button onClick={() => deletePost(post.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className={`grid gap-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.map((img: string, idx: number) => (
                      <img key={idx} src={img} alt="Post" className="w-full h-80 object-cover rounded-[32px] border border-gray-100 shadow-sm" />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-8 pt-4 border-t border-gray-50">
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group/btn">
                    <div className="p-2 group-hover/btn:bg-primary/5 rounded-xl transition-all"><Heart size={20} /></div>
                    <span className="font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group/btn">
                    <div className="p-2 group-hover/btn:bg-primary/5 rounded-xl transition-all"><MessageSquare size={20} /></div>
                    <span className="font-black">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group/btn ml-auto">
                    <div className="p-2 group-hover/btn:bg-primary/5 rounded-xl transition-all"><Share2 size={20} /></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2"><TrendingUp size={24} className="text-primary" />热门话题</h3>
            <div className="space-y-4">
              {[{ name: '周杰伦南京站', count: '2.5w' }, { name: '草莓音乐节攻略', count: '1.2w' }].map((topic) => (
                <div key={topic.name} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-gray-600 font-bold group-hover:text-primary transition-colors"># {topic.name}</span>
                  <span className="text-xs font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{topic.count}</span>
=======
          {/* Posts Feed */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-full bg-gray-100" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{post.user}</h4>
                        <button 
                          onClick={() => toggleFollow(post.userId)}
                          className={`text-xs font-black px-3 py-1 rounded-full transition-all ${
                            isFollowing(post.userId)
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                          }`}
                        >
                          {isFollowing(post.userId) ? '已关注' : '+ 关注'}
                        </button>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{post.time} · {post.tag}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-900">
                    <Plus size={20} className="rotate-45" />
                  </button>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg">{post.content}</p>
                
                {post.images.length > 0 && (
                  <div className="rounded-2xl overflow-hidden border border-gray-100">
                    <img src={post.images[0]} alt="Post" className="w-full h-auto max-h-[400px] object-cover" />
                  </div>
                )}
                
                <div className="flex items-center gap-8 pt-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold">
                    <Heart size={20} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold">
                    <MessageSquare size={20} />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors font-bold ml-auto">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <TrendingUp size={24} className="text-primary" />
              热门话题
            </h3>
            <div className="space-y-4">
              {['#周杰伦南京站#', '#Livehouse避坑指南#', '#寻找草莓音乐节搭子#', '#LiveJoy开票提醒#', '#上海演出场馆攻略#'].map(tag => (
                <a key={tag} href="#" className="flex items-center justify-between group">
                  <span className="text-sm font-bold text-gray-500 group-hover:text-primary transition-colors">{tag}</span>
                  <span className="text-[10px] bg-white px-2 py-1 rounded-lg text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all">2.4w 阅读</span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10 space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Music2 size={24} className="text-primary" />
              活跃用户
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="User" className="w-10 h-10 rounded-full bg-white" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">演出达人_{i}</p>
                      <p className="text-[10px] text-gray-400">发布了 42 条动态</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleFollow(200 + i)}
                    className={`text-[10px] font-black px-3 py-1 rounded-lg transition-all ${
                      isFollowing(200 + i)
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-primary text-white shadow-lg shadow-primary/20'
                    }`}
                  >
                    {isFollowing(200 + i) ? '已关注' : '关注'}
                  </button>
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
                </div>
              ))}
            </div>
          </div>
<<<<<<< HEAD
        </div>
=======
        </aside>
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
      </div>
    </div>
  );
};

export default SocialSquare;
