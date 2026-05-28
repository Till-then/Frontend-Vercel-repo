
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 行程规划模块 (Itinerary Service) ===
 * GET    /api/itinerary/:id       - 获取行程详情
 * PUT    /api/itinerary/:id       - 更新行程（手动调整）
 * POST   /api/itinerary/:id/share - 分享行程
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, ChevronRight, ArrowLeft, Share2, Download, Bus, Utensils, Music2, Star } from 'lucide-react';

const ItineraryDetail: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link to="/itinerary" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition-all">
            <Download size={20} />
            保存图片
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
            <Share2 size={20} />
            分享行程
          </button>
        </div>
      </div>

      <div className="bg-primary/5 p-10 rounded-[48px] border border-primary/10 space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary text-white text-[10px] font-black rounded-lg uppercase tracking-widest">AI 智能规划</span>
          <span className="text-gray-400 text-sm font-bold">生成于 2024-05-28</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 leading-tight">
          2024 周杰伦[嘉年华]<br />南京站 · 两日一夜深度观演之旅
        </h1>
        <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500">
          <span className="flex items-center gap-2"><Calendar size={18} className="text-primary" /> 10.26 - 10.27</span>
          <span className="flex items-center gap-2"><MapPin size={18} className="text-primary" /> 南京奥体中心</span>
          <span className="flex items-center gap-2"><Star size={18} className="text-primary" /> 深度体验模式</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-12 relative before:absolute before:left-[27px] before:top-8 before:bottom-8 before:w-1 before:bg-gray-100">
        {/* Day 1 */}
        <div className="space-y-8 relative">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-xl z-10 shadow-lg">1</div>
            <h2 className="text-2xl font-black text-gray-900">第一天：抵达与演出狂欢</h2>
          </div>
          
          <div className="ml-20 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-black">
                  <Clock size={18} />
                  10:30 - 12:00
                </div>
                <span className="px-2 py-1 bg-blue-50 text-blue-500 text-[10px] font-black rounded uppercase">交通</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">抵达南京南站，前往酒店</h4>
              <p className="text-gray-500 text-sm leading-relaxed">乘坐地铁1号线转10号线，约45分钟到达奥体中心附近酒店办理入住。</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-black">
                  <Clock size={18} />
                  12:30 - 14:00
                </div>
                <span className="px-2 py-1 bg-orange-50 text-orange-500 text-[10px] font-black rounded uppercase">午餐</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">品尝南京特色盐水鸭</h4>
              <p className="text-gray-500 text-sm leading-relaxed">推荐前往场馆附近的“老字号”餐馆，体验正宗金陵风味。</p>
            </div>

            <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4 ring-2 ring-primary/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-black">
                  <Clock size={18} />
                  19:00 - 22:00
                </div>
                <span className="px-2 py-1 bg-primary text-white text-[10px] font-black rounded uppercase">核心演出</span>
              </div>
              <h4 className="font-bold text-gray-900 text-xl">周杰伦 [嘉年华] 演唱会</h4>
              <p className="text-gray-600 leading-relaxed">建议提前2小时入场，奥体中心体育场周边人流量大，请注意安全。</p>
            </div>
          </div>
        </div>

        {/* Day 2 */}
        <div className="space-y-8 relative">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-gray-200 text-gray-500 rounded-2xl flex items-center justify-center font-black text-xl z-10 shadow-sm">2</div>
            <h2 className="text-2xl font-black text-gray-900">第二天：城市漫游与返程</h2>
          </div>
          
          <div className="ml-20 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary font-black">
                  <Clock size={18} />
                  10:00 - 14:00
                </div>
                <span className="px-2 py-1 bg-purple-50 text-purple-500 text-[10px] font-black rounded uppercase">游玩</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">夫子庙与秦淮河漫步</h4>
              <p className="text-gray-500 text-sm leading-relaxed">感受古都南京的历史底蕴，在秦淮河畔品尝特色小吃。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDetail;
