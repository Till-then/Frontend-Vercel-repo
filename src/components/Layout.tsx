
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, MapPin, Users, User, ChevronDown, Bell, Ticket, Compass, Calendar, Music2, LogIn, ShieldCheck, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CITIES } from '../data/mockData';

const Layout: React.FC = () => {
  const { selectedCity, setSelectedCity, currentUser, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', icon: <Home size={18} />, label: '首页' },
    { to: '/shows', icon: <Search size={18} />, label: '演出' },
    { to: '/venues', icon: <MapPin size={18} />, label: '场馆' },
    { to: '/travel', icon: <Compass size={18} />, label: '游玩' },
    { to: '/itinerary', icon: <Calendar size={18} />, label: 'AI行程' },
    { to: '/social', icon: <Users size={18} />, label: '社交' },
  ];

  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* PC Top Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-3 border-gray-200 shadow-sm' : 'bg-white py-5 border-transparent'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Music2 className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-gray-900 leading-none">LiveJoy</span>
              <span className="text-[10px] text-primary font-bold tracking-[0.1em] uppercase">Performance Guide</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-bold' 
                    : 'text-gray-500 hover:text-primary hover:bg-primary/5'}
                `}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* City Selector */}
            <div className="relative group">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full cursor-pointer hover:border-primary/50 transition-colors">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm font-medium">{selectedCity}</span>
                <ChevronDown size={14} className="text-gray-400 group-hover:text-primary transition-transform group-hover:rotate-180" />
              </div>
              <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-primary/10 hover:text-primary transition-colors ${selectedCity === city ? 'text-primary bg-primary/5 font-bold' : 'text-gray-600'}`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Auth Actions */}
            {currentUser ? (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
                {isAdmin && (
                  <Link to="/admin" className="p-2 text-gray-500 hover:text-primary transition-colors title='管理后台'">
                    <ShieldCheck size={20} />
                  </Link>
                )}
                <div className="relative group">
                  <div className="w-9 h-9 rounded-full bg-primary/10 p-[2px] cursor-pointer">
                    <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-900">{currentUser.username}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">个人中心</Link>
                    <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={14} />
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">登录</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-bold bg-primary text-white rounded-full hover:bg-primary-hover transition-colors">注册</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-28 pb-12 max-w-[1400px] mx-auto px-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Music2 className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black text-white">LiveJoy</span>
            </div>
            <p className="text-sm leading-relaxed">
              LiveJoy 是专注长三角地区的演出玩乐指南。我们为您提供最全的演唱会、Livehouse、音乐节资讯，以及场馆周边的全方位攻略。
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">快速链接</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shows" className="hover:text-primary transition-colors">演出资讯</Link></li>
              <li><Link to="/venues" className="hover:text-primary transition-colors">场馆攻略</Link></li>
              <li><Link to="/travel" className="hover:text-primary transition-colors">周边游玩</Link></li>
              <li><Link to="/social" className="hover:text-primary transition-colors">社交找搭子</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">服务支持</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">关于我们</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">商务合作</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">用户协议</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">隐私政策</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">关注我们</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
                <Music2 size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
                <Calendar size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
                <Users size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs">
          <p>© 2024 LiveJoy - 你的演出玩乐指南. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
