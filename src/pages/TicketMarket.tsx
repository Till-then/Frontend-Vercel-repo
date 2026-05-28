
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 票务模块 (Ticket Service) ===
 * GET    /api/tickets             - 获取二手票务列表
 * POST   /api/tickets             - 发布票务信息
 * DELETE /api/tickets/:id           - 删除票务信息
 */

import React from 'react';
import { Search, Filter, Ticket, MapPin, ChevronRight, ArrowLeft, ShieldCheck, Plus, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TicketMarket: React.FC = () => {
  const tickets = [
    { id: 1, show: '周杰伦南京站', date: '10.26', price: 1200, originalPrice: 980, type: '看台', status: '转让中' },
    { id: 2, show: '告五人上海站', date: '09.15', price: 680, originalPrice: 680, type: '内场', status: '转让中' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <Link to="/social" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-4xl font-black text-gray-900">票务集市</h1>
      </div>

      <div className="p-6 bg-brand-amber/10 border border-brand-amber/20 rounded-3xl flex items-start gap-4">
        <AlertTriangle className="text-brand-amber flex-shrink-0" size={24} />
        <div className="space-y-1">
          <h4 className="font-bold text-brand-amber">安全提醒</h4>
          <p className="text-sm text-brand-amber/80 leading-relaxed">
            LiveJoy 仅作为信息撮合平台，不参与交易过程。请务必选择官方渠道或面对面交易，谨防诈骗。
          </p>
        </div>
      </div>

      <div className="bg-primary/5 -mx-6 px-6 py-12 rounded-[48px] flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="搜索演出名称..."
            className="w-full h-16 pl-16 pr-6 bg-white border border-gray-100 rounded-2xl text-lg shadow-xl shadow-primary/5 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <button className="px-8 h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-3">
          <Plus size={24} />
          发布票务
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white p-8 rounded-[32px] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
            <div className="flex items-center gap-6 w-full md:w-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                <Ticket size={32} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-gray-900">{ticket.show}</h3>
                <p className="text-sm text-gray-500 font-bold flex items-center gap-4">
                  <span>日期: {ticket.date}</span>
                  <span>区域: {ticket.type}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between w-full md:w-auto md:gap-12">
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">转让价</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-primary">¥{ticket.price}</span>
                  <span className="text-xs text-gray-400 line-through">原价{ticket.originalPrice}</span>
                </div>
              </div>
              <button className="px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-primary transition-all">
                立即咨询
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketMarket;
