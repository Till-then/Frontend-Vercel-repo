
import React, { useState } from 'react';
import { Search, Filter, Ticket, MapPin, ChevronRight, ArrowLeft, ShieldCheck, Plus, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchWithSuggestions from '../components/SearchWithSuggestions';

const TicketMarket: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const tickets = [
    { id: 1, show: '周杰伦南京站', date: '10.26', price: 1200, originalPrice: 980, type: '看台', status: '转让中' },
    { id: 2, show: '告五人上海站', date: '09.15', price: 680, originalPrice: 680, type: '内场', status: '转让中' },
    { id: 3, show: '草莓音乐节 杭州站', date: '11.02', price: 450, originalPrice: 480, type: '单日票', status: '转让中' },
  ];

  const filteredTickets = tickets.filter(ticket => 
    ticket.show.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const suggestions = tickets.filter(ticket => 
    ticket.show.toLowerCase().includes(searchTerm.toLowerCase())
  ).map(ticket => ({
    id: ticket.id.toString(),
    title: ticket.show,
    subtitle: `${ticket.date} · ${ticket.type} · ¥${ticket.price}`,
    type: '票务',
    data: ticket
  }));

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <Link to="/social" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-4xl font-black text-gray-900">票务集市</h1>
      </div>

      <div className="p-6 bg-orange-50 border border-orange-100 rounded-3xl flex items-start gap-4">
        <AlertTriangle className="text-orange-500 flex-shrink-0" size={24} />
        <div className="space-y-1">
          <h4 className="font-bold text-orange-700">安全提醒</h4>
          <p className="text-sm text-orange-600 leading-relaxed">
            LiveJoy 仅作为信息撮合平台，不参与交易过程。请务必选择官方渠道或面对面交易，谨防诈骗。
          </p>
        </div>
      </div>

      <div className="bg-primary/5 -mx-6 px-6 py-12 rounded-[48px] flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 w-full">
          <SearchWithSuggestions
            placeholder="搜索演出名称..."
            onSearch={(term) => setSearchTerm(term)}
            suggestions={suggestions}
            onSuggestionClick={(s) => setSearchTerm(s.title)}
            className="h-16"
            inputClassName="text-lg pl-12 rounded-2xl shadow-xl shadow-primary/5"
          />
        </div>
        <button className="px-8 h-16 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-3">
          <Plus size={24} />
          发布票务
        </button>
      </div>

      <div className="space-y-4">
        {filteredTickets.length > 0 ? filteredTickets.map(ticket => (
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
                  <span className="text-xs text-gray-400 line-through ml-2">原价{ticket.originalPrice}</span>
                </div>
              </div>
              <button className="px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-primary transition-all">
                立即咨询
              </button>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">暂无匹配的票务信息</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketMarket;
