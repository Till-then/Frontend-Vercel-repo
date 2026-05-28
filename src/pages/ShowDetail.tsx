
<<<<<<< HEAD
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SHOWS, VENUES } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { toast } from 'sonner';
=======
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 演出模块 (Show Service) ===
 * GET    /api/shows/:id           - 获取演出详情
 * POST   /api/shows/:id/remind    - 设置开票提醒
 * DELETE /api/shows/:id/remind    - 取消开票提醒
 * POST   /api/shows/:id/favorite  - 收藏演出
 * DELETE /api/shows/:id/favorite  - 取消收藏
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SHOWS, VENUES } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Heart, 
  Bell, 
  Share2, 
  ChevronRight, 
  Info, 
  Ticket,
  Music2,
  Users,
  Star,
  ShieldCheck,
<<<<<<< HEAD
  ArrowLeft,
  MessageSquare,
  Send,
  X,
  Plus
=======
  ArrowLeft
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
} from 'lucide-react';

const ShowDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const show = SHOWS.find(s => s.id === id) || SHOWS[0];
  const venue = VENUES.find(v => v.id === show.venueId) || VENUES[0];

<<<<<<< HEAD
  const { favorites, toggleFavorite, reminders, toggleReminder, posts, currentUser, addPost } = useAppContext();
  const isFavorite = favorites.includes(show.id);
  const isReminded = reminders.includes(show.id);

  const [showPostInput, setShowPostInput] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const relatedPosts = posts.filter(post => 
    post.content.toLowerCase().includes(show.artist.toLowerCase()) || 
    post.content.toLowerCase().includes(show.title.toLowerCase())
  ).slice(0, 3);

  const handleQuickPost = () => {
    if (!currentUser) {
      toast.error('请先登录');
      return;
    }
    if (!newPostContent.trim()) return;
    addPost(newPostContent, []);
    setNewPostContent('');
    setShowPostInput(false);
    toast.success('发布成功');
  };

=======
  const { favorites, toggleFavorite, reminders, toggleReminder } = useAppContext();
  const isFavorite = favorites.includes(show.id);
  const isReminded = reminders.includes(show.id);

>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
  return (
    <div className="space-y-12 pb-24">
      {/* Breadcrumbs & Back */}
      <div className="flex items-center gap-4">
        <Link to="/shows" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-primary">首页</Link>
          <ChevronRight size={14} />
          <Link to="/shows" className="hover:text-primary">演出列表</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold truncate max-w-[200px]">{show.title}</span>
        </div>
      </div>

<<<<<<< HEAD
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
=======
      {/* Main Info Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Poster */}
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl shadow-primary/10">
              <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6">
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${
                  show.status === '售票中' ? 'bg-primary text-white' :
                  show.status === '即将开票' ? 'bg-brand-amber text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {show.status}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => toggleFavorite(show.id)}
                className={`flex items-center justify-center gap-2 h-14 rounded-2xl font-bold transition-all ${
<<<<<<< HEAD
                  isFavorite ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
=======
                  isFavorite 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
                }`}
              >
                <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                {isFavorite ? '已收藏' : '收藏'}
              </button>
              <button className="flex items-center justify-center gap-2 h-14 bg-gray-50 text-gray-500 border border-gray-100 rounded-2xl font-bold hover:bg-gray-100 transition-all">
<<<<<<< HEAD
                <Share2 size={20} />分享
=======
                <Share2 size={20} />
                分享
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
              </button>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl font-black text-gray-900 leading-tight">{show.title}</h1>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 border border-gray-100">
                <Music2 size={16} className="text-primary" />{show.type}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 border border-gray-100">
                <Star size={16} className="text-yellow-500" />人气 9.8
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0"><Calendar size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">演出时间</p>
                  <p className="text-lg font-black text-gray-900">{show.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center flex-shrink-0"><MapPin size={24} /></div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">演出场馆</p>
                  <Link to={`/venue-detail?id=${venue.id}`} className="text-lg font-black text-gray-900 hover:text-primary transition-colors flex items-center gap-1">{venue.name}<ChevronRight size={20} /></Link>
                  <p className="text-sm text-gray-500 mt-1">{venue.address}</p>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">票价信息</p>
                <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-primary">¥{show.price}</span><span className="text-gray-400 font-bold">起</span></div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button onClick={() => toggleReminder(show.id)} className={`flex-1 md:flex-none px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isReminded ? 'bg-brand-amber/10 text-brand-amber border border-brand-amber/20' : 'bg-brand-amber text-white shadow-lg shadow-brand-amber/20 hover:scale-105'}`}><Bell size={20} className={isReminded ? 'fill-current' : ''} />{isReminded ? '已设提醒' : '开票提醒'}</button>
                <button className="flex-1 md:flex-none px-12 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">立即购票</button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2"><Info size={24} className="text-primary" />演出介绍</h2>
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{show.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2"><MessageSquare size={24} className="text-primary" />相关讨论</h2>
              <button onClick={() => setShowPostInput(!showPostInput)} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">发布讨论 <Plus size={16} /></button>
            </div>
            
            {showPostInput && (
              <div className="bg-white p-6 rounded-3xl border-2 border-primary/20 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4">
                <textarea value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="分享你对这场演出的期待或心得..." className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 resize-none h-24" />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowPostInput(false)} className="px-6 py-2 text-gray-500 font-bold">取消</button>
                  <button onClick={handleQuickPost} className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">发布</button>
                </div>
              </div>
            )}

            {relatedPosts.length > 0 ? (
              <div className="space-y-4">
                {relatedPosts.map(post => (
                  <div key={post.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{post.username[0]}</div>
                      <span className="font-bold text-gray-900 text-sm">{post.username}</span>
                      <span className="text-xs text-gray-400">{post.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1"><Heart size={14} /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare size={14} /> {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-3xl p-10 text-center text-gray-400">暂无相关讨论，快去发布第一条动态吧！</div>
            )}
=======
        {/* Right: Details */}
        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-black rounded-lg uppercase tracking-widest">
                {show.type}
              </span>
              <div className="flex items-center gap-1 text-brand-amber">
                <Star size={14} className="fill-current" />
                <span className="text-sm font-black">9.8</span>
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight">
              {show.title}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">演出时间</p>
                  <p className="text-lg font-black text-gray-900">{show.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">演出场馆</p>
                  <p className="text-lg font-black text-gray-900">{show.venue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-primary/5 rounded-[32px] border border-primary/10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary font-black uppercase tracking-widest">票价范围</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black text-primary">¥{show.price}</span>
                  <span className="text-lg font-bold text-primary/60">起</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">官方票务</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-gray-900 text-white text-[10px] font-black rounded">大麦</span>
                  <span className="px-2 py-1 bg-gray-900 text-white text-[10px] font-black rounded">猫眼</span>
                  <span className="px-2 py-1 bg-gray-900 text-white text-[10px] font-black rounded">秀动</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 h-16 bg-primary text-white font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] transition-all">
                立即抢票
              </button>
              <button 
                onClick={() => toggleReminder(show.id)}
                className={`flex items-center justify-center gap-2 px-8 h-16 rounded-2xl font-bold transition-all ${
                  isReminded 
                    ? 'bg-brand-amber text-white shadow-xl shadow-brand-amber/20' 
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-primary'
                }`}
              >
                <Bell size={24} className={isReminded ? 'fill-current' : ''} />
                {isReminded ? '已设提醒' : '开票提醒'}
              </button>
            </div>
            <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> 官方保障</span>
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> 极速出票</span>
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> 真实票源</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <Info size={24} className="text-primary" />
              演出介绍
            </h3>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                {show.description} 更多精彩内容，尽在 LiveJoy 演出详情。本次演出将为您带来前所未有的视听盛宴，顶级的舞台设计与音响设备，配合艺人的精彩演绎，定会让您流连忘返。
              </p>
            </div>
          </div>

          <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <MapPin size={24} className="text-primary" />
                场馆信息与攻略
              </h3>
              <Link to={`/venue-detail?id=${venue.id}`} className="text-primary font-bold flex items-center gap-1 hover:underline">
                查看场馆攻略 <ChevronRight size={18} />
              </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-md">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{venue.name}</h4>
                  <p className="text-gray-500 text-sm mt-1">{venue.address}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {venue.facilities.map((f, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-bold text-gray-500">{f}</span>
                  ))}
                </div>
              </div>
            </div>
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowDetail;
