
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 演出模块 (Show Service) ===
 * GET    /api/shows               - 获取演出列表（支持搜索、筛选、分页）
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { CITIES } from '../data/mockData';
// --- 原本地逻辑（保留为注释，便于回退） ---
// import { SHOWS } from '../data/mockData';
import { ShowCard } from '../components/ShowCard';
import { Search, Filter, MapPin, Calendar, ChevronDown, Music2, Ticket, Mic2, Music, TrendingUp, Zap, Camera } from 'lucide-react';
import SearchWithSuggestions from '../components/SearchWithSuggestions';

const ShowList: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialType = queryParams.get('type') || '全部';

  // 真实后端：shows 来自 AppContext（GET /shows），新增 / 编辑 / 删除会自动同步到这里
  const { shows } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCity, setSelectedCity] = useState('全部');
  const [selectedStatus, setSelectedStatus] = useState('全部');

  const types = ['全部', '演唱会', 'Livehouse', '音乐节', '话剧展览', '体育赛事', '曲艺杂谈'];
  const statuses = ['全部', '售票中', '即将开票', '已售罄'];

  // --- 原本地逻辑 ---
  // const filteredShows = SHOWS.filter(...)
  // const suggestions = SHOWS.filter(...).map(...)
  const filteredShows = shows.filter(show => {
    const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         show.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '全部' || show.type === selectedType;
    const matchesCity = selectedCity === '全部' || show.city === selectedCity;
    const matchesStatus = selectedStatus === '全部' || show.status === selectedStatus;
    return matchesSearch && matchesType && matchesCity && matchesStatus;
  });

  const suggestions = shows.filter(show =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    show.artist.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(show => ({
    id: show.id,
    title: show.title,
    subtitle: `${show.artist} · ${show.city} · ${show.type}`,
    type: show.type,
    data: show
  }));

  return (
    <div className="space-y-12">
      {/* Header & Search */}
      <div className="bg-primary/5 -mx-6 px-6 py-16 rounded-[48px] space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-black text-gray-900">探索 LiveJoy 演出</h1>
          <p className="text-gray-500 text-lg">在长三角，发现你最期待的现场体验</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <SearchWithSuggestions
            placeholder="搜索演出名称、艺人、场馆或城市..."
            onSearch={(term) => setSearchTerm(term)}
            suggestions={suggestions}
            onSuggestionClick={(s) => navigate(`/shows/${s.id}`)}
            className="h-20"
            inputClassName="text-xl pl-16 rounded-3xl shadow-xl shadow-primary/5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="sticky top-32 space-y-8">
            <div className="flex items-center gap-2 text-gray-900 font-black text-xl">
              <Filter size={24} className="text-primary" />
              筛选条件
            </div>

            {/* City Filter */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={16} />
                演出城市
              </h3>
              <div className="flex flex-wrap gap-2">
                {['全部', ...CITIES].map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      selectedCity === city 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Music2 size={16} />
                演出类型
              </h3>
              <div className="space-y-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`w-full px-4 py-3 rounded-xl text-sm font-bold text-left transition-all flex items-center justify-between group ${
                      selectedType === type 
                        ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                    {selectedType === type && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Ticket size={16} />
                销售状态
              </h3>
              <div className="space-y-2">
                {statuses.map(status => (
                  <label key={status} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer group transition-colors">
                    <input 
                      type="radio" 
                      name="status" 
                      checked={selectedStatus === status}
                      onChange={() => setSelectedStatus(status)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className={`text-sm font-bold ${selectedStatus === status ? 'text-gray-900' : 'text-gray-500'}`}>{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 font-medium">
              找到 <span className="text-primary font-black">{filteredShows.length}</span> 场精彩演出
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900 cursor-pointer hover:text-primary transition-colors">
              默认排序 <ChevronDown size={16} />
            </div>
          </div>

          {filteredShows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredShows.map(show => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center space-y-6 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Search size={40} className="text-gray-200" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-900">未找到相关演出</h3>
                <p className="text-gray-500">试着更换搜索关键词或筛选条件吧</p>
              </div>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('全部');
                  setSelectedCity('全部');
                  setSelectedStatus('全部');
                }}
                className="px-8 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
              >
                重置所有筛选
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowList;
