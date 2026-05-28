
<<<<<<< HEAD
import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { SHOWS, MOCK_USERS } from '../data/mockData';
import { ShowCard } from '../components/ShowCard';
import { 
  ChevronLeft, 
  Trash2, 
  Heart, 
  Phone, 
  Mail, 
  Lock, 
  Edit2, 
  Save, 
  Info, 
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

const SubPageHeader: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4 mb-8">
      <button 
        onClick={() => navigate('/profile')}
        className="p-2 hover:bg-gray-100 rounded-full transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-3xl font-black text-gray-900">{title}</h1>
    </div>
  );
};

export const MyOrders = () => (
  <div className="max-w-4xl mx-auto">
    <SubPageHeader title="我的订单" />
    <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-[48px]">暂无订单记录</div>
  </div>
);

export const MyReminders = () => (
  <div className="max-w-4xl mx-auto">
    <SubPageHeader title="开票提醒" />
    <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-[48px]">暂无提醒记录</div>
  </div>
);

export const MyItineraries = () => (
  <div className="max-w-4xl mx-auto">
    <SubPageHeader title="行程规划" />
    <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-[48px]">暂无行程规划</div>
  </div>
);

export const MyTickets = () => (
  <div className="max-w-4xl mx-auto">
    <SubPageHeader title="我的票夹" />
    <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-[48px]">暂无票务记录</div>
  </div>
);

export const MyFavorites = () => {
  const { favorites, toggleFavorite } = useAppContext();
  const favoriteShows = SHOWS.filter(s => favorites.includes(s.id));
  return (
    <div className="max-w-4xl mx-auto">
      <SubPageHeader title="我的收藏" />
      {favoriteShows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {favoriteShows.map(show => (
            <div key={show.id} className="relative group">
              <ShowCard show={show} />
              <button 
                onClick={() => toggleFavorite(show.id)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-gray-50 rounded-[48px]">
          <Heart size={48} className="mx-auto text-gray-200" />
          <p className="text-gray-500">暂无收藏的演出</p>
          <Link to="/shows" className="inline-block text-primary font-bold">去看看热门演出 →</Link>
        </div>
      )}
    </div>
  );
};

export const MyFollowing = () => {
  const { following, toggleFollow } = useAppContext();
  const users = MOCK_USERS.filter(u => following.includes(u.id));
  return (
    <div className="max-w-4xl mx-auto">
      <SubPageHeader title="我的关注" />
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        {users.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {users.map(user => (
              <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.username} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900">{user.username}</h3>
                    <p className="text-sm text-gray-500">注册于 {user.registerTime}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFollow(user.id)}
                  className="px-6 py-2 rounded-xl text-sm font-bold bg-gray-100 text-gray-500"
                >
                  已关注
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-gray-400">暂无关注的用户</div>
        )}
      </div>
    </div>
  );
};

export const MyFollowers = () => {
  const { followers, following, toggleFollow } = useAppContext();
  const users = MOCK_USERS.filter(u => followers.includes(u.id));
  return (
    <div className="max-w-4xl mx-auto">
      <SubPageHeader title="我的粉丝" />
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        {users.length > 0 ? (
          <div className="divide-y divide-gray-50">
            {users.map(user => (
              <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.username} className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="font-bold text-gray-900">{user.username}</h3>
                    <p className="text-sm text-gray-500">注册于 {user.registerTime}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleFollow(user.id)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    following.includes(user.id)
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-primary text-white'
                  }`}
                >
                  {following.includes(user.id) ? '已关注' : '关注'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-20 text-center text-gray-400">暂无粉丝</div>
        )}
      </div>
    </div>
  );
};

export const MyReviews = () => {
  const { currentUser, posts, deletePost } = useAppContext();
  const myPosts = posts.filter(p => p.userId === currentUser?.id);
  return (
    <div className="max-w-4xl mx-auto">
      <SubPageHeader title="我的评价" />
      <div className="space-y-6">
        {myPosts.length > 0 ? (
          myPosts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400 font-bold">{post.time}</div>
                <button 
                  onClick={() => deletePost(post.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {post.images.map((img: string, i: number) => (
                    <img key={i} src={img} alt="" className="w-full h-32 object-cover rounded-xl" />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-6 pt-2 border-t border-gray-50">
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                  <Heart size={16} /> {post.likes}
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                  <MessageSquare size={16} /> {post.comments}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-[48px]">暂无发布的动态</div>
        )}
      </div>
    </div>
  );
};

export const AccountSecurity = () => {
  const { currentUser, updateUser } = useAppContext();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = (field: string) => {
    if (field === 'phone') {
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        toast.error('请输入有效的手机号');
        return;
      }
      updateUser({ phone: formData.phone });
    } else if (field === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('请输入有效的邮箱地址');
        return;
      }
      updateUser({ email: formData.email });
    } else if (field === 'password') {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('两次输入的密码不一致');
        return;
      }
      toast.success('密码修改成功');
    }
    setEditMode(null);
    toast.success('保存成功');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SubPageHeader title="账号安全" />
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Phone size={24} /></div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">手机号码</div>
              {editMode === 'phone' ? (
                <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg" />
              ) : (
                <div className="font-bold text-gray-900">{currentUser?.phone}</div>
              )}
            </div>
          </div>
          <button onClick={() => editMode === 'phone' ? handleSave('phone') : setEditMode('phone')} className="px-6 py-2 bg-gray-50 text-gray-600 font-bold rounded-xl">{editMode === 'phone' ? '保存' : '修改'}</button>
        </div>
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center"><Mail size={24} /></div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">电子邮箱</div>
              {editMode === 'email' ? (
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg" />
              ) : (
                <div className="font-bold text-gray-900">{currentUser?.email}</div>
              )}
            </div>
          </div>
          <button onClick={() => editMode === 'email' ? handleSave('email') : setEditMode('email')} className="px-6 py-2 bg-gray-50 text-gray-600 font-bold rounded-xl">{editMode === 'email' ? '保存' : '修改'}</button>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center"><Lock size={24} /></div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">登录密码</div>
                <div className="font-bold text-gray-900">••••••••</div>
              </div>
            </div>
            <button onClick={() => setEditMode(editMode === 'password' ? null : 'password')} className="px-6 py-2 bg-gray-50 text-gray-600 font-bold rounded-xl">{editMode === 'password' ? '取消' : '修改'}</button>
          </div>
          {editMode === 'password' && (
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <input type="password" placeholder="新密码" value={formData.newPassword} onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              <input type="password" placeholder="确认新密码" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              <button onClick={() => handleSave('password')} className="w-full py-3 bg-primary text-white font-bold rounded-xl">确认修改</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const HelpFeedback = () => {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div className="max-w-2xl mx-auto text-center py-20 space-y-8">
      <CheckCircle2 size={48} className="mx-auto text-green-500" />
      <h2 className="text-3xl font-black text-gray-900">感谢您的反馈！</h2>
      <button onClick={() => setSubmitted(false)} className="px-12 py-4 bg-primary text-white font-black rounded-2xl">返回</button>
    </div>
  );
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <SubPageHeader title="帮助与反馈" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-2xl font-black text-gray-900">关于我们</h3>
          <p className="text-gray-600">LiveJoy 是专为演出爱好者打造的一站式攻略平台。</p>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-2xl font-black text-gray-900">问题反馈</h3>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <textarea required rows={4} placeholder="请描述您的问题..." className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl" />
            <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-2xl">提交</button>
          </form>
        </div>
      </div>
    </div>
  );
};
=======
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 用户模块 (User Service) ===
 * GET    /api/user/orders         - 获取用户订单列表
 * GET    /api/user/reminders      - 获取开票提醒列表
 * GET    /api/user/itineraries    - 获取行程单列表
 * GET    /api/user/tickets        - 获取电子票夹
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ticket, Bell, Calendar, CreditCard, ChevronRight, Music2, Clock, MapPin } from 'lucide-react';

const SubPageLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-8">
    <div className="flex items-center gap-4">
      <Link to="/profile" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary transition-all">
        <ArrowLeft size={20} />
      </Link>
      <h1 className="text-3xl font-black text-gray-900">{title}</h1>
    </div>
    {children}
  </div>
);

export const MyOrders: React.FC = () => (
  <SubPageLayout title="我的订单">
    <div className="space-y-4">
      {[1, 2].map(i => (
        <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img src={`https://modao.cc/agent-py/media/generated_images/2026-05-26/85d7a08bb1914ada81e3e1d8f851a325.jpg#desc=ShowPoster`} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900">2024 周杰伦 [嘉年华] 世界巡回演唱会</h3>
              <p className="text-xs text-gray-400">订单号: LWJ2024052800{i} · 下单时间: 2024-05-28</p>
              <p className="text-sm font-black text-primary mt-2">¥1,200 <span className="text-xs text-gray-400 font-normal">(2张)</span></p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg">交易成功</span>
            <button className="px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-primary transition-all">查看详情</button>
          </div>
        </div>
      ))}
    </div>
  </SubPageLayout>
);

export const MyReminders: React.FC = () => (
  <SubPageLayout title="开票提醒">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img src={`https://modao.cc/agent-py/media/generated_images/2026-05-26/0d5b2d985ee34ce5aecdeca00d6cc161.jpg#desc=ShowPoster`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate">告五人 [宇宙超有趣] 巡回演唱会</h3>
              <p className="text-xs text-brand-amber font-bold mt-1 flex items-center gap-1">
                <Clock size={12} />
                预计 06.15 10:00 开票
              </p>
            </div>
          </div>
          <button className="w-full py-3 bg-primary/5 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-all">
            取消提醒
          </button>
        </div>
      ))}
    </div>
  </SubPageLayout>
);

export const MyItineraries: React.FC = () => (
  <SubPageLayout title="我的行程">
    <div className="space-y-4">
      <div className="bg-white p-8 rounded-[32px] border border-gray-100 group hover:shadow-xl hover:shadow-primary/5 transition-all">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 text-primary font-black text-sm">
              <Calendar size={18} />
              2024.10.26 - 10.27
            </div>
            <h3 className="text-xl font-black text-gray-900">南京奥体中心·两日一夜深度游</h3>
            <p className="text-gray-500 text-sm">包含周杰伦演唱会门票、周边美食推荐及住宿规划。</p>
          </div>
          <Link to="/itinerary-detail?id=1" className="px-8 py-3 bg-gray-900 text-white font-black rounded-xl hover:bg-primary transition-all">
            查看完整行程
          </Link>
        </div>
      </div>
    </div>
  </SubPageLayout>
);

export const MyTickets: React.FC = () => (
  <SubPageLayout title="我的票夹">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[1, 2].map(i => (
        <div key={i} className="bg-gray-900 text-white rounded-[32px] p-8 space-y-6 relative overflow-hidden group">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Ticket size={24} className="text-white" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">电子票凭证</span>
            </div>
            <div>
              <h3 className="text-xl font-black leading-tight">2024 周杰伦 [嘉年华] 世界巡回演唱会</h3>
              <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                <MapPin size={14} /> 南京奥体中心体育场
              </p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">座位信息</p>
                <p className="font-black">看台 A2区 12排 08座</p>
              </div>
              <button className="px-4 py-2 bg-white text-gray-900 text-xs font-black rounded-lg hover:bg-primary hover:text-white transition-all">
                入场二维码
              </button>
            </div>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
            <Music2 size={160} />
          </div>
        </div>
      ))}
    </div>
  </SubPageLayout>
);
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
