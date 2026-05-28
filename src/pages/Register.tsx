
/**
 * ========================================
 * LiveJoy RESTful API 接口文档注释
 * ========================================
 *
 * === 用户模块 (User Service) ===
 * POST   /api/user/register       - 用户注册
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Music2, User, Lock, Eye, EyeOff, ArrowLeft, Mail, Phone } from 'lucide-react';

const Register: React.FC = () => {
  const { register } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.phone || !formData.email || !formData.password) {
      setError('请填写完整信息');
      return;
    }
    
    if (formData.username.length < 2) {
      setError('用户名至少2个字符');
      return;
    }
    
    if (!/^\d{11}$/.test(formData.phone)) {
      setError('请输入正确的11位手机号');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('请输入正确的邮箱格式');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('密码至少6位');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('两次密码输入不一致');
      return;
    }
    
    const success = register(formData);
    if (success) {
      navigate('/');
    } else {
      setError('注册失败，请稍后重试');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Music2 className="text-white" size={28} />
              </div>
              <span className="text-3xl font-black text-gray-900">LiveJoy</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800">创建账号</h2>
            <p className="text-gray-500 mt-2 text-center">加入 LiveJoy，探索长三角演出魅力</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-sm rounded-xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">用户名</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="2-20个字符"
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">手机号</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="11位手机号"
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">电子邮箱</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@livejoy.com"
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="至少6位"
                  className="w-full h-11 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">确认密码</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="请再次输入密码"
                  className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-12 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                注册并登录
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              已有账号？{' '}
              <Link to="/login" className="font-bold text-primary hover:underline">立即登录</Link>
            </p>
          </div>
        </div>
        
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors">
            <ArrowLeft size={14} />
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
