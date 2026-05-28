
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 管理后台扩展 ===
 * GET    /api/admin/shows            - 获取所有演出
 * POST   /api/admin/shows            - 新增演出（弹窗）
 * PUT    /api/admin/shows/:id        - 编辑演出（弹窗）
 * DELETE /api/admin/shows/:id        - 删除演出
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  X,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { SHOWS, Show, CITIES } from '../data/mockData';
import { toast } from 'sonner';

const AdminShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>(SHOWS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState<Show | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Show>>({
    title: '',
    artist: '',
    city: '上海',
    venue: '',
    type: '演唱会',
    date: '',
    price: 0,
    status: '售票中',
    image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/c3daff8de6e9496d9b9d53a7f94179d5.jpg#desc=Poster',
    description: ''
  });

  const filteredShows = shows.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (show?: Show) => {
    if (show) {
      setEditingShow(show);
      setFormData(show);
    } else {
      setEditingShow(null);
      setFormData({
        title: '',
        artist: '',
        city: '上海',
        venue: '',
        type: '演唱会',
        date: '',
        price: 0,
        status: '售票中',
        image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/c3daff8de6e9496d9b9d53a7f94179d5.jpg#desc=Poster',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist || !formData.venue) {
      toast.error('请填写必填项');
      return;
    }

    if (editingShow) {
      setShows(shows.map(s => s.id === editingShow.id ? { ...s, ...formData } as Show : s));
      toast.success('演出信息已更新');
    } else {
      const newShow = {
        ...formData,
        id: (shows.length + 1).toString(),
        venueId: 'v1' // Default for demo
      } as Show;
      setShows([newShow, ...shows]);
      toast.success('新演出已添加');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这场演出吗？')) {
      setShows(shows.filter(s => s.id !== id));
      toast.success('演出已删除');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">演出管理</h1>
          <p className="text-gray-500 mt-1">管理平台上的所有演出信息，支持弹窗式新增与编辑。</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
        >
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
                    <p className="text-sm font-bold text-gray-700">{show.city}</p>
                    <p className="text-xs text-gray-500 mt-1">{show.venue}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-600">{show.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      show.status === '售票中' ? 'bg-emerald-50 text-emerald-600' :
                      show.status === '即将开票' ? 'bg-amber-50 text-amber-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {show.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(show)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(show.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="flex items-center justify-between p-8 border-b border-gray-50">
              <h2 className="text-2xl font-black text-gray-900">{editingShow ? '编辑演出' : '新增演出'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">演出名称 *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    placeholder="请输入演出完整标题"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">艺人/团体 *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.artist}
                    onChange={e => setFormData({...formData, artist: e.target.value})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    placeholder="请输入艺人名称"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">演出类型</label>
                  <select 
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value as any})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  >
                    <option>演唱会</option>
                    <option>Livehouse</option>
                    <option>音乐节</option>
                    <option>话剧展览</option>
                    <option>体育赛事</option>
                    <option>曲艺杂谈</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">城市</label>
                  <select 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">场馆名称 *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.venue}
                    onChange={e => setFormData({...formData, venue: e.target.value})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    placeholder="请输入场馆名称"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">演出日期</label>
                  <input 
                    type="text" 
                    value={formData.date}
                    onChange={e => setFormData({...formData, date: e.target.value})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    placeholder="如: 2024.10.26"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">起步票价 (元)</label>
                  <input 
                    type="number" 
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">销售状态</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as any})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  >
                    <option>售票中</option>
                    <option>即将开票</option>
                    <option>已售罄</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">海报 URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">演出描述</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary h-32 resize-none"
                    placeholder="请输入演出详细介绍..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-4 mt-10 pt-6 border-t border-gray-50">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-3 text-gray-500 font-bold hover:text-gray-700 transition-all"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="px-10 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all"
                >
                  {editingShow ? '保存修改' : '确认添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminShows;
