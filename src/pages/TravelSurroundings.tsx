
<<<<<<< HEAD
import React, { useState } from 'react';
import { Utensils, Hotel, Coffee, MapPin, Star, ChevronRight, Search, Filter } from 'lucide-react';
import SearchWithSuggestions from '../components/SearchWithSuggestions';

const TravelSurroundings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('餐饮');
  const [searchTerm, setSearchTerm] = useState('');
=======
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 周边游玩模块 (Surrounding Service) ===
 * GET    /api/surroundings        - 获取周边资源列表（支持类型筛选：餐饮/住宿/娱乐）
 * GET    /api/surroundings/:id    - 获取周边资源详情
 */

import React, { useState } from 'react';
import { Utensils, Hotel, Coffee, MapPin, Star, ChevronRight, Search, Filter } from 'lucide-react';

const TravelSurroundings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('餐饮');
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
  
  const tabs = [
    { name: '餐饮', icon: <Utensils size={20} />, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: '住宿', icon: <Hotel size={20} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: '娱乐', icon: <Coffee size={20} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

<<<<<<< HEAD
  const allItems = [
=======
  const items = [
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
    { id: 1, name: '奥体中心美食街', type: '餐饮', distance: '500m', price: '¥80/人', rating: 4.8, image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/dfc81cab1ecc4a9ba52b7af345e95023.jpg#desc=FoodStreet' },
    { id: 2, name: '全季酒店(奥体店)', type: '住宿', distance: '800m', price: '¥350/晚', rating: 4.5, image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/08b0bff522ce4b218e0521f9083e7347.jpg#desc=Hotel' },
    { id: 3, name: '悦刻KTV', type: '娱乐', distance: '1.2km', price: '¥120/人', rating: 4.2, image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/a20ed7ef57b8417c9d831ead01a2c6a9.jpg#desc=KTV' },
    { id: 4, name: '南京特色盐水鸭', type: '餐饮', distance: '600m', price: '¥45/人', rating: 4.9, image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/18462d12e18845ee99081ee6659fa357.jpg#desc=Duck' },
<<<<<<< HEAD
  ];

  const filteredItems = allItems.filter(item => {
    const matchesTab = item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const suggestions = allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(item => ({
    id: item.id.toString(),
    title: item.name,
    subtitle: `${item.type} · ${item.distance} · ${item.price}`,
    type: item.type,
    data: item
  }));
=======
  ].filter(item => item.type === activeTab);
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129

  return (
    <div className="space-y-12">
      <div className="bg-primary/5 -mx-6 px-6 py-16 rounded-[48px] space-y-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-black text-gray-900">周边玩乐攻略</h1>
          <p className="text-gray-500 text-lg">观演之余，发现场馆周边的美食与美景</p>
        </div>

<<<<<<< HEAD
        <div className="max-w-xl mx-auto space-y-4">
          <SearchWithSuggestions
            placeholder="搜索餐厅、住宿或娱乐场所..."
            onSearch={(term) => setSearchTerm(term)}
            suggestions={suggestions}
            onSuggestionClick={(s) => {
              setSearchTerm(s.title);
              setActiveTab(s.type || '餐饮');
            }}
            className="h-16"
            inputClassName="pl-12 rounded-2xl shadow-xl shadow-primary/5"
          />

          <div className="flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-primary/5">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black transition-all ${
                  activeTab === tab.name 
                    ? `${tab.bg} ${tab.color} shadow-sm` 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
=======
        <div className="max-w-xl mx-auto flex items-center gap-2 p-2 bg-white rounded-2xl shadow-xl shadow-primary/5">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black transition-all ${
                activeTab === tab.name 
                  ? `${tab.bg} ${tab.color} shadow-sm` 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<<<<<<< HEAD
        {filteredItems.map(item => (
=======
        {items.map(item => (
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
          <div key={item.id} className="bg-white rounded-[32px] border border-gray-100 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black shadow-sm">
                {item.distance}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
<<<<<<< HEAD
                <div className="flex items-center gap-1 text-orange-500 text-xs font-black">
=======
                <div className="flex items-center gap-1 text-brand-amber text-xs font-black">
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
                  <Star size={14} className="fill-current" />
                  {item.rating}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-primary">{item.price}</span>
                <span className="text-gray-400 flex items-center gap-1">
                  <MapPin size={12} />
                  查看路线
                </span>
              </div>
              <button className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-all">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      {filteredItems.length === 0 && (
=======
      {items.length === 0 && (
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
        <div className="py-24 text-center">
          <p className="text-gray-400 font-bold">暂无相关推荐</p>
        </div>
      )}
    </div>
  );
};

export default TravelSurroundings;
