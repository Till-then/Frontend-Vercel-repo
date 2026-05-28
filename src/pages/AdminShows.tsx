
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 演出模块 (Show Service) ===
 * GET    /api/shows               - 获取演出列表（支持搜索、筛选、分页）
 * POST   /api/shows               - 新增演出（管理员）
 * PUT    /api/shows/:id           - 更新演出信息（管理员）
 * DELETE /api/shows/:id           - 删除演出（管理员）
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { SHOWS, Show } from '../data/mockData';

const AdminShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>(SHOWS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredShows = shows.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这场演出吗？')) {
      setShows(shows.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">演出管理</h1>
          <p className="text-gray-500 mt-1">管理平台上的所有演出信息，包括新增、编辑和下架操作。</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
          <Plus size={20} />
          新增演出
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索演出名称、艺人..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-all text-sm"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
            <Filter size={16} />
            筛选
          </button>
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-gray-50 text-gray-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-all">
            导出数据
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">演出信息</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">城市/场馆</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">时间</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredShows.map((show) => (
                <tr key={show.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={show.image} alt={show.title} className="w-12 h-16 object-cover rounded-lg shadow-sm" />
                      <div>
                        <p className="font-bold text-gray-900 line-clamp-1">{show.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{show.artist} · {show.type}</p>
                        <p className="text-xs font-bold text-primary mt-1">¥{show.price} 起</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{show.city}</p>
                    <p className="text-xs text-gray-500 mt-1">{show.venue}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{show.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      show.status === '售票中' ? 'bg-emerald-100 text-emerald-600' :
                      show.status === '即将开票' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {show.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="编辑">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(show.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                        title="删除"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredShows.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500">未找到相关演出</p>
          </div>
        )}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>共 {filteredShows.length} 条数据</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>上一页</button>
            <button className="px-3 py-1 bg-primary text-white rounded">1</button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50" disabled>下一页</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShows;
