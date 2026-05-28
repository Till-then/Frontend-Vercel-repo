
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 用户模块 (User Service) ===
 * GET    /api/user/profile        - 获取当前用户信息
 * PUT    /api/user/profile        - 更新用户信息
 * GET    /api/user/:id/followers  - 获取粉丝列表
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { 
  Settings, 
  ChevronRight, 
  Ticket, 
  Heart, 
  Bell, 
  Calendar, 
  CreditCard, 
  Shield, 
  HelpCircle,
  LogOut,
  Users,
  Star,
  Music2,
  MapPin
} from 'lucide-react';

const Profile: React.FC = () => {
  const { currentUser, logout, following, favorites } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path: string;
    count?: string;
  }

  const menuGroups: { title: string; items: MenuItem[] }[] = [
    {
      title: '我的活动',
      items: [
        { icon: <CreditCard size={20} />, label: '我的订单', path: '/profile/orders', count: '2' },
        { icon: <Bell size={20} />, label: '开票提醒', path: '/profile/reminders', count: '5' },
        { icon: <Calendar size={20} />, label: '行程规划', path: '/profile/itineraries', count: '1' },
        { icon: <Ticket size={20} />, label: '我的票夹', path: '/profile/tickets', count: '3' },
      ]
    },
    {
      title: '社区互动',
      items: [
        { icon: <Heart size={20} />, label: '我的收藏', path: '/profile/favorites', count: favorites.length.toString() },
        { icon: <Users size={20} />, label: '关注/粉丝', path: '/profile/social', count: following.length.toString() },
        { icon: <Star size={20} />, label: '评价分享', path: '/profile/posts', count: '12' },
      ]
    },
    {
      title: '系统设置',
      items: [
        { icon: <Shield size={20} />, label: '账号安全', path: '/profile/security' },
        { icon: <HelpCircle size={20} />, label: '帮助与反馈', path: '/profile/help' },
      ]
    }
  ];

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
          <Music2 size={48} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-gray-900">开启你的演出之旅</h2>
          <p className="text-gray-500">登录后即可查看订单、收藏演出及定制行程</p>
        </div>
        <Link to="/login" className="px-12 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all">
          立即登录 / 注册
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Profile Header */}
      <section className="bg-primary/5 p-10 rounded-[48px] border border-primary/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white p-1 shadow-xl shadow-primary/10">
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            </div>
            <button className="absolute bottom-1 right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg border border-gray-100 hover:scale-110 transition-transform">
              <Settings size={20} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900">{currentUser.username}</h1>
              <p className="text-gray-500 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                <MapPin size={14} />
                上海 · 演出达人
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-8">
              <div className="text-center md:text-left">
                <p className="text-2xl font-black text-gray-900">{following.length}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">关注</p>
              </div>
              <div className="text-center md:text-left border-l border-gray-200 pl-8">
                <p className="text-2xl font-black text-gray-900">128</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">粉丝</p>
              </div>
              <div className="text-center md:text-left border-l border-gray-200 pl-8">
                <p className="text-2xl font-black text-gray-900">42</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">动态</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menuGroups.map((group, i) => (
          <section key={i} className="space-y-6">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-4">{group.title}</h3>
            <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
              {group.items.map((item, j) => (
                <Link 
                  key={j} 
                  to={item.path} 
                  className="flex items-center justify-between p-5 hover:bg-primary/5 transition-all group border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-white transition-all">
                      {item.icon}
                    </div>
                    <span className="font-bold text-gray-700 group-hover:text-gray-900">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] font-black rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-all">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <button 
        onClick={handleLogout}
        className="w-full h-16 bg-white border border-red-100 text-red-500 font-black rounded-[32px] flex items-center justify-center gap-2 hover:bg-red-50 transition-all shadow-sm"
      >
        <LogOut size={24} />
        退出登录
      </button>
    </div>
  );
};

export default Profile;
