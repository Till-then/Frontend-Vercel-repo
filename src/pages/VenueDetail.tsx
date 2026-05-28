
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 场馆模块 (Venue Service) ===
 * GET    /api/venues/:id           - 获取场馆详情（含攻略信息）
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { VENUES } from '../data/mockData';
import { 
  Bus, 
  MapPin, 
  Info, 
  ChevronRight, 
  ArrowLeft, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  Coffee, 
  Utensils, 
  Hotel,
  Music2,
  Users
} from 'lucide-react';

const VenueDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const venue = VENUES.find(v => v.id === id) || VENUES[0];

  return (
    <div className="space-y-12 pb-24">
      {/* Header with Background */}
      <section className="relative h-[400px] -mx-6 rounded-b-[64px] overflow-hidden">
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="max-w-4xl space-y-4">
            <Link to="/venues" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4">
              <ArrowLeft size={20} />
              返回场馆列表
            </Link>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary text-white text-xs font-black rounded-lg uppercase tracking-widest shadow-lg shadow-primary/30">
                {venue.city}
              </span>
              <span className="text-white/60 font-bold flex items-center gap-1">
                <Users size={14} />
                容纳 {venue.capacity || '60,000'} 人
              </span>
            </div>
            <h1 className="text-5xl font-black text-white">{venue.name}</h1>
            <p className="text-white/80 text-lg flex items-center gap-2">
              <MapPin size={20} className="text-primary" />
              {venue.address}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-8 space-y-12">
          {/* Traffic Guide */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Bus size={28} />
              </div>
              交通攻略
            </h2>
            <div className="bg-gray-50 rounded-[32px] border border-gray-100 p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                  <Navigation size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">推荐路线</h4>
                  <p className="text-gray-600 mt-2 leading-relaxed">{venue.transport}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-50">
                <div className="w-10 h-10 bg-brand-amber/10 rounded-xl flex items-center justify-center text-brand-amber flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">返程末班车</h4>
                  <p className="text-gray-600 mt-1">最晚一班地铁/公交约为 <span className="text-brand-amber font-black">{venue.lastBus}</span>，请合理安排离场时间。</p>
                </div>
              </div>
            </div>
          </section>

          {/* Entrance Notice */}
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple">
                <Info size={28} />
              </div>
              入场须知
            </h2>
            <div className="bg-gray-50 rounded-[32px] border border-gray-100 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    安全须知
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{venue.notice}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <ShieldCheck size={20} className="text-emerald-500" />
                    场馆设施
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {venue.facilities.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500 shadow-sm">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Surroundings Entry */}
          <section className="p-10 bg-gray-900 rounded-[40px] text-white relative overflow-hidden">
            <div className="relative z-10 max-w-lg space-y-6">
              <h2 className="text-3xl font-black">探索周边玩乐</h2>
              <p className="text-gray-400">
                LiveJoy 为你精选场馆周边的美食、住宿和娱乐资源，让你的观演之旅不虚此行。
              </p>
              <div className="flex gap-4">
                <Link to="/travel" className="px-6 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary-hover transition-all">
                  立即查看
                </Link>
                <div className="flex items-center gap-4 text-gray-500">
                  <Utensils size={20} />
                  <Hotel size={20} />
                  <Coffee size={20} />
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
              <Music2 className="w-full h-full p-8" />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
            <h3 className="text-xl font-black text-gray-900">地图导航</h3>
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
              <img 
                src="https://modao.cc/agent-py/media/generated_images/2026-05-28/6c174d7694c64a96b050818ba57662d0.jpg#desc=VenueMap" 
                alt="Map" 
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/40 animate-bounce">
                  <MapPin size={24} />
                </div>
              </div>
            </div>
            <button className="w-full h-14 bg-gray-900 text-white font-black rounded-xl flex items-center justify-center gap-2 hover:bg-primary transition-all">
              <Navigation size={20} />
              打开第三方地图
            </button>
          </div>

          <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10 space-y-6">
            <h3 className="text-xl font-black text-gray-900">近期演出</h3>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <Link key={i} to="/show-detail?id=1" className="flex gap-4 group">
                  <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={`https://modao.cc/agent-py/media/generated_images/2026-05-26/85d7a08bb1914ada81e3e1d8f851a325.jpg#desc=ShowPoster`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">2024 周杰伦 [嘉年华] 世界巡回演唱会-南京站</h4>
                    <p className="text-[10px] text-gray-500 mt-1">2024.10.26-10.27</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/shows" className="w-full h-12 bg-white border border-primary/20 text-primary font-bold rounded-xl flex items-center justify-center text-sm hover:bg-primary hover:text-white transition-all">
              查看全部演出
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetail;
