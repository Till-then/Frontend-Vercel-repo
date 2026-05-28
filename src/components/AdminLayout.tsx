
import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Music2, 
  MapPin, 
  MessageSquare, 
  Users, 
  ArrowLeft,
  LogOut,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: '数据仪表盘', end: true },
    { to: '/admin/shows', icon: <Music2 size={20} />, label: '演出管理' },
    { to: '/admin/venues', icon: <MapPin size={20} />, label: '场馆管理' },
    { to: '/admin/posts', icon: <MessageSquare size={20} />, label: '帖子管理' },
    { to: '/admin/users', icon: <Users size={20} />, label: '用户管理' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-20">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md">
              <Music2 className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-gray-900 leading-none">LiveJoy</span>
              <span className="text-[8px] text-primary font-bold tracking-widest uppercase mt-0.5">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-primary transition-colors rounded-xl mb-2">
            <ArrowLeft size={20} />
            <span>返回前台</span>
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors rounded-xl"
          >
            <LogOut size={20} />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="搜索管理项..." 
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-primary transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{currentUser?.username || '管理员'}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">System Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/10 p-[2px]">
                <img src={currentUser?.avatar} alt="Avatar" className="w-full h-full rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
