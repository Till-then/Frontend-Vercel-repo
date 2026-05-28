
import React, { useRef } from 'react';
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
  MapPin,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { currentUser, logout, following, favorites, updateUser, posts } = useAppContext();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('已退出登录');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
        toast.success('头像已更新');
      };
      reader.readAsDataURL(https://modao.cc/agent-py/workspace/6a1553035894283edfa228c1/performance-guide-app_v4.react/src/pages/file);
    }
  };

  interface MenuItem {
    icon: React.ReactNode;
    label: string;
    path: string;
    count?: string;
  }

  const userPostsCount = posts.filter(p => p.userId === currentUser?.id).length;

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
        { icon: <Users size={20} />, label: '关注/粉丝', path: '/profile/follows', count: following.length.toString() },
        { icon: <Star size={20} />, label: '评价分享', path: '/profile/reviews', count: userPostsCount.toString() },
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
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <div className="w-32 h-32 rounded-full bg-white p-1 shadow-xl shadow-primary/10 overflow-hidden">
              <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover transition-all group-hover:scale-110 group-hover:opacity-80" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-black/40 p-2 rounded-full text-white">
                <Camera size={20} />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-gray-900">{currentUser.username}</h1>
              <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} />
                上海 · 资深乐迷
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-8">
              <div className="text-center">
                <p className="text-xl font-black text-gray-900">{following.length}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">关注</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-gray-900">128</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">粉丝</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-gray-900">{userPostsCount}</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">动态</p>
              </div>
            </div>
          </div>

          <button className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all">
            <Settings size={24} className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* Menu Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest ml-4">{group.title}</h3>
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              {group.items.map((item, i) => (
                <Link 
                  key={i} 
                  to={item.path}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-0 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      {item.icon}
                    </div>
                    <span className="font-bold text-gray-900">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-full">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-primary transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleLogout}
        className="w-full py-6 bg-gray-50 text-gray-400 font-black rounded-[32px] border border-gray-100 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center gap-3"
      >
        <LogOut size={20} />
        退出登录
      </button>
    </div>
  );
};

export default Profile;
