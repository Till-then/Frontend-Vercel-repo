
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 场馆模块 (Venue Service) ===
 * GET    /api/venues              - 获取场馆列表（支持城市筛选）
 * POST   /api/venues              - 新增场馆（管理员）
 * PUT    /api/venues/:id           - 更新场馆信息（管理员）
 * DELETE /api/venues/:id           - 删除场馆（管理员）
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin,
  Users,
  Info
} from 'lucide-react';
import { VENUES, Venue } from '../data/mockData';

const AdminVenues: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>(VENUES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个场馆吗？')) {
      setVenues(venues.filter(v => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">场馆管理</h1>
          <p className="text-gray-500 mt-1">管理平台合作的演出场馆，维护场馆攻略、交通及入场须知。</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
          <Plus size={20} />
          新增场馆
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索场馆名称、城市、地址..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">场馆名称</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">城市/地址</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">容纳人数</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">设施</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredVenues.map((venue) => (
                <tr key={venue.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={venue.image} alt={venue.name} className="w-16 h-12 object-cover rounded-lg shadow-sm" />
                      <div>
                        <p className="font-bold text-gray-900">{venue.name}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin size={12} />
                          ID: {venue.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{venue.city}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{venue.address}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <Users size={16} className="text-gray-400" />
                      {venue.capacity?.toLocaleString() || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {venue.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md">{f}</span>
                      ))}
                      {venue.facilities.length > 3 && <span className="text-[10px] text-gray-400">+{venue.facilities.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="查看详情">
                        <Info size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="编辑">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(venue.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                        title="删除"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVenues;
