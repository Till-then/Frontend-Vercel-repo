
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 场馆模块 (Venue Service) ===
 * GET    /api/venues              - 获取场馆列表（支持城市筛选）
 */

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CITIES } from '../data/mockData';
// --- 原本地逻辑（保留为注释，便于回退） ---
// import { VENUES } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Bus, Info, Navigation, Users } from 'lucide-react';
import SearchWithSuggestions from '../components/SearchWithSuggestions';

const VenueList: React.FC = () => {
  const navigate = useNavigate();
  // 真实后端：venues 来自 AppContext（GET /venues），新增/编辑会自动同步
  const { venues } = useAppContext();
  const [selectedCity, setSelectedCity] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');

  // --- 原本地逻辑 ---
  // const filteredVenues = VENUES.filter(...)
  // const suggestions = VENUES.filter(...).map(...)
  const filteredVenues = venues.filter(v => {
    const matchesCity = selectedCity === '全部' || v.city === selectedCity;
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const suggestions = venues.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(v => ({
    id: v.id,
    title: v.name,
    subtitle: v.city,
    type: '场馆',
    data: v
  }));

  return (
    <div className="space-y-12">
      <div className="bg-primary/5 -mx-6 px-6 py-16 rounded-[48px] space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-black text-gray-900">演出场馆攻略</h1>
          <p className="text-gray-500 text-lg">LiveJoy 为你提供最详尽的交通、入场及周边信息</p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchWithSuggestions
              placeholder="搜索场馆名称或地址..."
              onSearch={(term) => setSearchTerm(term)}
              suggestions={suggestions}
              onSuggestionClick={(s) => navigate(`/venue-detail?id=${s.id}`)}
              className="h-16"
              inputClassName="text-lg pl-12 rounded-2xl shadow-xl shadow-primary/5"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {['全部', ...CITIES].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`flex-shrink-0 px-6 h-16 rounded-2xl font-bold transition-all ${
                  selectedCity === city 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
            <div className="flex flex-col sm:flex-row h-full">
              <div className="sm:w-2/5 relative overflow-hidden">
                <img src={venue.image} alt={venue.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest">
                    {venue.city}
                  </span>
                </div>
              </div>
              <div className="sm:w-3/5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary transition-colors leading-tight">
                    {venue.name}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-start gap-2">
                    <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    {venue.address}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                    <span className="flex items-center gap-1"><Users size={14} /> 容纳 {venue.capacity || '6w+'} 人</span>
                    <span className="flex items-center gap-1"><Navigation size={14} /> 交通便利</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {venue.facilities.slice(0, 3).map((f, i) => (
                      <span key={i} className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded-lg border border-gray-100">{f}</span>
                    ))}
                  </div>
                  <Link 
                    to={`/venue-detail?id=${venue.id}`}
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg shadow-gray-900/10"
                  >
                    查看场馆攻略 <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
