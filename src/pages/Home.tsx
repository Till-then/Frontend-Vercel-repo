
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 演出模块 (Show Service) ===
 * GET    /api/shows               - 获取演出列表（支持搜索、筛选、分页）
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SHOWS } from '../data/mockData';
import { ShowCard } from '../components/ShowCard';
import { ChevronRight, Search, Mic2, Music, Ticket, Camera, MapPin, Clock, Star, TrendingUp, Zap, Music2, Users, Compass } from 'lucide-react';

const Home: React.FC = () => {
  const { selectedCity } = useAppContext();

  const categories = [
    { name: '演唱会', icon: <Mic2 size={24} />, color: 'from-pink-500 to-rose-500', path: '/shows?type=演唱会' },
    { name: 'Livehouse', icon: <Music size={24} />, color: 'from-purple-500 to-indigo-500', path: '/shows?type=Livehouse' },
    { name: '音乐节', icon: <Ticket size={24} />, color: 'from-orange-500 to-amber-500', path: '/shows?type=音乐节' },
    { name: '话剧展览', icon: <Camera size={24} />, color: 'from-blue-500 to-cyan-500', path: '/shows?type=话剧展览' },
    { name: '体育赛事', icon: <TrendingUp size={24} />, color: 'from-green-500 to-emerald-500', path: '/shows?type=体育赛事' },
    { name: '曲艺杂谈', icon: <Zap size={24} />, color: 'from-yellow-500 to-orange-500', path: '/shows?type=曲艺杂谈' },
  ];

  const upcomingShows = SHOWS.filter(s => s.status === '即将开票').slice(0, 4);
  const recommendedShows = SHOWS.filter(s => s.city === selectedCity).slice(0, 8);
  const hotShows = SHOWS.slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Banner Section */}
      <section className="relative h-[500px] rounded-[32px] overflow-hidden group shadow-2xl shadow-primary/10">
        <img 
          src="https://modao.cc/agent-py/media/generated_images/2026-05-26/e479759fdfe24699b98613038ff773f9.jpg#desc=Featured%20Event" 
          alt="Banner" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center px-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30">
              <Star size={14} className="fill-white" />
              年度重磅推荐
            </div>
            <h1 className="text-6xl font-black text-white leading-tight">
              LiveJoy<br />
              <span className="text-primary">超级音乐盛典</span>
            </h1>
            <p className="text-gray-200 text-lg max-w-lg leading-relaxed">
              集结顶尖艺人阵容，横跨长三角5大核心城市。在 LiveJoy，开启属于你的音乐狂欢之旅。
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Link to="/show-detail?id=1" className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-105 transition-all">
                立即抢票
              </Link>
              <Link to="/shows" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all">
                了解更多
              </Link>
            </div>
          </div>
        </div>
        
        {/* Banner Navigation Dots */}
        <div className="absolute bottom-8 right-12 flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-3 h-3 rounded-full border-2 border-white/50 ${i === 1 ? 'bg-primary border-primary' : ''}`}></div>
          ))}
        </div>
      </section>

      {/* Search & Categories */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜索演出、艺人、场馆..."
            className="w-full h-16 bg-gray-50 border border-gray-100 rounded-2xl pl-16 pr-6 text-lg focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
          />
        </div>
        <div className="lg:col-span-8 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <Link 
              key={cat.name} 
              to={cat.path} 
              className="flex-shrink-0 flex flex-col items-center gap-3 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {cat.icon}
              </div>
              <span className="text-sm font-bold text-gray-500 group-hover:text-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ticket Countdown Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3 text-gray-900">
              <Clock size={32} className="text-primary" />
              抢票播报站
            </h2>
            <p className="text-gray-500 mt-1">准点开抢，在 LiveJoy 定好闹钟不迷路</p>
          </div>
          <Link to="/shows" className="flex items-center gap-1 text-primary font-bold hover:underline">
            全部演出 <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>

      {/* Recommended for you */}
      <section className="space-y-8 bg-primary/5 -mx-6 px-6 py-16 rounded-[48px]">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black flex items-center gap-3 text-gray-900">
              <Star size={32} className="text-primary" />
              {selectedCity} 必看演出
            </h2>
            <p className="text-gray-500 mt-1">根据你的城市，LiveJoy 为你精选推荐</p>
          </div>
          <Link to="/shows" className="flex items-center gap-1 text-primary font-bold hover:underline">
            查看更多 <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>

      {/* Popular Venues Entry */}
      <section className="relative h-80 rounded-[40px] overflow-hidden group">
        <img 
          src="https://modao.cc/agent-py/media/generated_images/2026-05-26/97693845014644789547d6be20677465.jpg#desc=Venue%20Background" 
          alt="Venue" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-white mb-4">探索演出场馆攻略</h2>
            <p className="text-gray-300 mb-8">
              交通路线、入场须知、周边配套。LiveJoy 帮你搞定观演前的一切琐事。
            </p>
            <Link to="/venues" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-black hover:bg-primary hover:text-white transition-all">
              立即探索 <MapPin size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Zap size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">开票提醒</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            设置心仪演出的开票提醒，LiveJoy 将在开售前第一时间通知你，抢票快人一步。
          </p>
        </div>
        <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
          <div className="w-14 h-14 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">社交找搭子</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            演出没人陪？在 LiveJoy 社区寻找志同道合的“搭子”，一起看演出，分享快乐。
          </p>
        </div>
        <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
          <div className="w-14 h-14 bg-brand-amber/10 rounded-2xl flex items-center justify-center text-brand-amber">
            <Compass size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">周边玩乐指南</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            看完演出去哪玩？LiveJoy 为你准备了场馆周边的美食、住宿、游玩一站式攻略。
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
