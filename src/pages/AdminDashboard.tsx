
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 管理后台 (Admin Service) ===
 * GET    /api/admin/dashboard     - 获取仪表盘统计数据
 */

import React from 'react';
import { 
  Users, 
  Music2, 
  MapPin, 
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Clock
} from 'lucide-react';
import { SHOWS, VENUES, MOCK_POSTS, MOCK_USERS } from '../data/mockData';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: '演出总数', value: SHOWS.length, icon: <Music2 size={24} />, color: 'bg-blue-500', trend: '+12%' },
    { label: '场馆总数', value: VENUES.length, icon: <MapPin size={24} />, color: 'bg-emerald-500', trend: '+2' },
    { label: '用户总数', value: MOCK_USERS.length + 1000, icon: <Users size={24} />, color: 'bg-purple-500', trend: '+15%' },
    { label: '待审核帖子', value: MOCK_POSTS.filter(p => p.status === '待审核').length, icon: <MessageSquare size={24} />, color: 'bg-amber-500', trend: '5' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">数据仪表盘</h1>
        <p className="text-gray-500 mt-1">欢迎回来，以下是 LiveJoy 平台的最新动态数据概览。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 ${stat.color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} />
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              最近活动
            </h3>
            <button className="text-xs font-bold text-primary hover:underline">查看全部</button>
          </div>
          <div className="divide-y divide-gray-50">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <Clock size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    用户 <span className="font-bold text-primary">demo_user</span> 发布了新的评价
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">2024-05-28 10:30</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-900">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links / Status */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">快捷操作</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-primary/5 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-all">新增演出</button>
              <button className="p-3 bg-purple-50 text-purple-600 text-sm font-bold rounded-xl hover:bg-purple-500 hover:text-white transition-all">新增场馆</button>
              <button className="p-3 bg-amber-50 text-amber-600 text-sm font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all">审核帖子</button>
              <button className="p-3 bg-blue-50 text-blue-600 text-sm font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all">系统设置</button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">系统状态</h3>
              <p className="text-gray-400 text-sm mb-4">所有服务正在正常运行，负载平稳。</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span>API 服务</span>
                  <span className="text-emerald-400">正常</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[98%]"></div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>数据库</span>
                  <span className="text-emerald-400">正常</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[95%]"></div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12">
              <Music2 size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
