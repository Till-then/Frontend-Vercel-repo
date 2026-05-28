
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
  ArrowLeft
} from 'lucide-react';

const ShowDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const show = SHOWS.find(s => s.id === id) || SHOWS[0];
  const venue = VENUES.find(v => v.id === show.venueId) || VENUES[0];

  const { favorites, toggleFavorite, reminders, toggleReminder } = useAppContext();
  const isFavorite = favorites.includes(show.id);
  const isReminded = reminders.includes(show.id);

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

      {/* Main Info Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Poster */}
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
                  isFavorite 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
                }`}
              >
                <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                {isFavorite ? '已收藏' : '收藏'}
              </button>
              <button className="flex items-center justify-center gap-2 h-14 bg-gray-50 text-gray-500 border border-gray-100 rounded-2xl font-bold hover:bg-gray-100 transition-all">
                <Share2 size={20} />
                分享
              </button>
            </div>
          </div>
        </div>

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
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShowDetail;
