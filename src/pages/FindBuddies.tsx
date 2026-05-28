
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 找搭子模块 (Buddy Service) ===
 * GET    /api/buddies             - 获取找搭子列表（支持筛选）
 * POST   /api/buddies             - 发布找搭子邀请
 * POST   /api/user/:id/follow     - 关注用户
 * DELETE /api/user/:id/follow     - 取消关注
 */

import React, { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, MessageSquare, Plus, ArrowLeft, ChevronRight, Music2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const FindBuddies: React.FC = () => {
  const { isFollowing, toggleFollow } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const buddies = [
    {
      id: 1,
      userId: 301,
      username: '小皮',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xp',
      show: '周杰伦南京站',
      date: '2024.10.26',
      city: '南京',
      requirement: '想找个南京本地的姐妹一起去，看完可以一起吃个夜宵。',
      tags: ['限女生', '拼车', '饭搭子'],
      count: 1,
      target: 2,
    },
    {
      id: 2,
      userId: 302,
      username: '阿强',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aq',
      show: '草莓音乐节 杭州站',
      date: '2024.11.02',
      city: '杭州',
      requirement: '摇滚老炮，求个志同道合的哥们一起开火车！',
      tags: ['POGO', '摇滚', '蹦迪'],
      count: 3,
      target: 5,
    }
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <Link to="/social" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-4xl font-black text-gray-900">找演出搭子</h1>
      </div>

      <div className="bg-primary/5 -mx-6 px-6 py-12 rounded-[48px] flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜索演出名称或关键词..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-16 pl-16 pr-6 bg-white border border-gray-100 rounded-2xl text-lg shadow-xl shadow-primary/5 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <button className="px-8 h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-3">
          <Plus size={24} />
          发布邀请
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {buddies.map(buddy => (
          <div key={buddy.id} className="bg-white rounded-[40px] border border-gray-100 p-8 space-y-6 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img src={buddy.avatar} alt={buddy.username} className="w-14 h-14 rounded-full bg-gray-50 border border-gray-100" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-gray-900">{buddy.username}</h3>
                    <button 
                      onClick={() => toggleFollow(buddy.userId)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${
                        isFollowing(buddy.userId)
                          ? 'bg-gray-100 text-gray-400'
                          : 'bg-primary text-white shadow-lg shadow-primary/20'
                      }`}
                    >
                      {isFollowing(buddy.userId) ? '已关注' : '+ 关注'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={12} />
                    {buddy.city}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">目前进度</div>
                <div className="text-2xl font-black text-primary mt-1">
                  {buddy.count}<span className="text-sm text-gray-300 mx-1">/</span>{buddy.target}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-primary font-black">
                <Music2 size={18} />
                {buddy.show}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                <Calendar size={14} />
                {buddy.date}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{buddy.requirement}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {buddy.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-500">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2 flex gap-4">
              <button className="flex-1 h-14 bg-gray-900 text-white font-black rounded-xl hover:bg-primary transition-all flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                申请加入
              </button>
              <button className="w-14 h-14 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all">
                <Heart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindBuddies;
