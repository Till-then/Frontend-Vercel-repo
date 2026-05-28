
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
