
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 行程规划模块 (Itinerary Service) ===
 * POST   /api/itinerary/generate  - AI生成行程规划
 */

import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Clock, ChevronRight, Zap, Target, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ItineraryGuide: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(['深度游玩']);

  const togglePref = (tag: string) => {
    setSelectedPrefs(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/itinerary-detail?id=1');
    }, 2000);
  };

  return (
    <div className="space-y-16 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-black uppercase tracking-widest animate-pulse">
          <Sparkles size={18} />
          AI 智能驱动
        </div>
        <h1 className="text-6xl font-black text-gray-900 leading-tight">
          定制你的<br />
          <span className="text-primary">完美观演行程</span>
        </h1>
        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
          输入你的演出计划，LiveJoy AI 将为你一键生成涵盖交通、餐饮、住宿及周边游玩的完整行程单。
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-2xl shadow-primary/5 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">选择一场演出</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition-all appearance-none font-bold text-gray-900">
                  <option>2024 周杰伦 [嘉年华] - 南京站</option>
                  <option>告五人 [宇宙超有趣] - 上海站</option>
                  <option>草莓音乐节 2024 - 杭州站</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={20} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">出发城市</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <select className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition-all appearance-none font-bold text-gray-900">
                  <option>上海</option>
                  <option>杭州</option>
                  <option>苏州</option>
                  <option>合肥</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={20} />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-2">偏好设置</label>
              <div className="flex flex-wrap gap-3">
                {['深度游玩', '特种兵行程', '美食优先', '亲子友好', '高性价比'].map(tag => {
                  const isActive = selectedPrefs.includes(tag);
                  return (
                    <button 
                      key={tag} 
                      onClick={() => togglePref(tag)}
                      className={`px-5 py-2.5 border rounded-xl text-sm font-bold transition-all ${
                        isActive 
                          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                          : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-primary/10 hover:text-primary hover:border-primary/20'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-16 bg-primary text-white font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                正在规划中...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                一键生成 AI 行程
              </>
            )}
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[32px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
              <Zap size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">极速响应</h3>
              <p className="text-gray-500 mt-2 leading-relaxed">基于先进 AI 模型，秒级生成个性化行程建议，告别繁琐攻略。</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[32px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
            <div className="w-14 h-14 bg-brand-purple/10 rounded-2xl flex items-center justify-center text-brand-purple flex-shrink-0">
              <Target size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">精准匹配</h3>
              <p className="text-gray-500 mt-2 leading-relaxed">深度整合长三角 5 城演出、场馆及周边万级数据，确保行程合理可靠。</p>
            </div>
          </div>
          <div className="flex items-start gap-6 p-8 bg-gray-50 rounded-[32px] border border-gray-100 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
            <div className="w-14 h-14 bg-brand-amber/10 rounded-2xl flex items-center justify-center text-brand-amber flex-shrink-0">
              <Compass size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">一站式服务</h3>
              <p className="text-gray-500 mt-2 leading-relaxed">从出发到返程，涵盖吃喝住行全方位需求，LiveJoy 陪你玩转演出。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryGuide;
