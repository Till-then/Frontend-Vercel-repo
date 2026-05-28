
<<<<<<< HEAD
=======
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

>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MapPin,
  Users,
<<<<<<< HEAD
  Info,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { VENUES, Venue, CITIES } from '../data/mockData';
import { toast } from 'sonner';
=======
  Info
} from 'lucide-react';
import { VENUES, Venue } from '../data/mockData';
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129

const AdminVenues: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>(VENUES);
  const [searchTerm, setSearchTerm] = useState('');
<<<<<<< HEAD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Venue>>({
    name: '',
    city: '上海',
    address: '',
    capacity: 0,
    description: '',
    transport: '',
    notice: '',
    facilities: []
  });
=======
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129

  const filteredVenues = venues.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这个场馆吗？')) {
      setVenues(venues.filter(v => v.id !== id));
<<<<<<< HEAD
      toast.success('场馆已删除');
    }
  };

  const openAddModal = () => {
    setEditingVenue(null);
    setFormData({
      name: '',
      city: '上海',
      address: '',
      capacity: 0,
      description: '',
      transport: '',
      notice: '',
      facilities: [],
      image: 'https://modao.cc/agent-py/media/generated_images/2026-05-28/49b5a4c49ff84ab8988dfd963b8bdd0e.jpg#desc=VenueImage',
      coordinates: { lat: 31.2304, lng: 121.4737 }
    });
    setIsModalOpen(true);
  };

  const openEditModal = (venue: Venue) => {
    setEditingVenue(venue);
    setFormData(venue);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVenue) {
      setVenues(prev => prev.map(v => v.id === editingVenue.id ? { ...v, ...formData } as Venue : v));
      toast.success('场馆信息已更新');
    } else {
      const newVenue: Venue = {
        ...formData,
        id: `v${Date.now()}`,
        lastBus: '23:30'
      } as Venue;
      setVenues(prev => [newVenue, ...prev]);
      toast.success('新增场馆成功');
    }
    setIsModalOpen(false);
  };

=======
    }
  };

>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">场馆管理</h1>
          <p className="text-gray-500 mt-1">管理平台合作的演出场馆，维护场馆攻略、交通及入场须知。</p>
        </div>
<<<<<<< HEAD
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
        >
=======
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
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
<<<<<<< HEAD
                    <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
                      <Users size={14} className="text-gray-400" />
=======
                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                      <Users size={16} className="text-gray-400" />
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
                      {venue.capacity?.toLocaleString() || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
<<<<<<< HEAD
                      {venue.facilities.slice(0, 2).map((f, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[10px] font-bold rounded border border-gray-100">{f}</span>
                      ))}
                      {venue.facilities.length > 2 && <span className="text-[10px] text-gray-300">+{venue.facilities.length - 2}</span>}
=======
                      {venue.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md">{f}</span>
                      ))}
                      {venue.facilities.length > 3 && <span className="text-[10px] text-gray-400">+{venue.facilities.length - 3}</span>}
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
<<<<<<< HEAD
                      <button 
                        onClick={() => openEditModal(venue)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                      >
=======
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="查看详情">
                        <Info size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="编辑">
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(venue.id)}
<<<<<<< HEAD
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
=======
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors" 
                        title="删除"
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
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
<<<<<<< HEAD

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">{editingVenue ? '编辑场馆' : '新增场馆'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">场馆名称 *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all"
                    placeholder="请输入场馆完整名称"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">城市 *</label>
                  <select 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all"
                  >
                    {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">容纳人数 *</label>
                  <input 
                    required
                    type="number" 
                    value={formData.capacity}
                    onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">地址 *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">场馆介绍</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all h-24 resize-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">交通信息</label>
                  <textarea 
                    value={formData.transport}
                    onChange={e => setFormData({...formData, transport: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all h-20 resize-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">入场须知</label>
                  <textarea 
                    value={formData.notice}
                    onChange={e => setFormData({...formData, notice: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all h-20 resize-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">场馆设施 (逗号分隔)</label>
                  <input 
                    type="text" 
                    value={formData.facilities?.join(', ')}
                    onChange={e => setFormData({...formData, facilities: e.target.value.split(',').map(f => f.trim())})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-all"
                    placeholder="如：停车场, 饮水机, 寄存处"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                >
                  确认{editingVenue ? '修改' : '添加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
=======
>>>>>>> b2fb15220200eafc0616b3a3d4f0758e1e8fb129
    </div>
  );
};

export default AdminVenues;
