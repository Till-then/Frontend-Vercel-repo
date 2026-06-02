
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 管理后台 (Admin Service) ===
 * GET    /api/admin/users         - 获取用户列表
 * PUT    /api/admin/users/:id/status     - 禁用/启用用户
 */

import React, { useState, useEffect } from 'react';
import {
  Search,
  UserX,
  UserCheck,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield
} from 'lucide-react';
import { UserData } from '../data/mockData';
// --- 原本地逻辑（保留为注释，便于回退） ---
// import { MOCK_USERS } from '../data/mockData';
import * as usersApi from '../api/users';
import { toast } from 'sonner';

const AdminUsers: React.FC = () => {
  // 真实后端：用户列表 / 状态切换走 GET /admin/users、PUT /admin/users/:id/status
  // --- 原本地逻辑 ---
  // const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    usersApi
      .listUsers()
      .then(setUsers)
      .catch(() => {
        // --- 原本地逻辑 ---
        // setUsers(MOCK_USERS);
        setUsers([]);
        toast.error('加载用户列表失败');
      });
  }, []);

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm)
  );

  const toggleUserStatus = async (id: number) => {
    const target = users.find(u => u.id === id);
    if (!target) return;
    const next = target.status === '正常' ? '禁用' : '正常';
    // 乐观更新
    const snapshot = users;
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: next } : u));
    try {
      // --- 原本地逻辑 ---
      // setUsers(users.map(u => u.id === id ? { ...u, status: next } : u));
      await usersApi.updateUserStatus(id, next);
    } catch {
      setUsers(snapshot);
      toast.error('状态更新失败');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">用户管理</h1>
          <p className="text-gray-500 mt-1">查看平台注册用户，管理用户权限及账号状态。</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索用户名、邮箱、手机号..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-all text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-50 p-1 border border-gray-100">
                    <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{user.username}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">UID: {user.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                  user.status === '正常' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                }`}>
                  {user.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-400" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  {user.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  注册于 {user.registerTime}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-100 transition-all">
                  <Eye size={16} />
                  详情
                </button>
                <button 
                  onClick={() => toggleUserStatus(user.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-bold rounded-xl transition-all ${
                    user.status === '正常' 
                      ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                      : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100'
                  }`}
                >
                  {user.status === '正常' ? (
                    <>
                      <UserX size={16} />
                      禁用
                    </>
                  ) : (
                    <>
                      <UserCheck size={16} />
                      启用
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
