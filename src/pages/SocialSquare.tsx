
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, Heart, Share2, Plus, Users, Ticket, Camera, Send, Search, TrendingUp, Music2, X, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'sonner';

const SocialSquare: React.FC = () => {
  const { currentUser, posts, addPost, deletePost, toggleLike, isFollowing, toggleFollow } = useAppContext();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    if (!currentUser) {
      toast.error('请先登录后发布动态');
      navigate('/login');
      return;
    }
    if (!content.trim() && images.length === 0) {
      toast.error('请输入内容或上传图片');
      return;
    }
    addPost(content, images);
    setContent('');
    setImages([]);
    toast.success('动态发布成功');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const filteredPosts = posts.filter(p => 
    p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Social Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-primary/5 p-12 rounded-[48px]">
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-5xl font-black text-gray-900">LiveJoy 社区</h1>
          <p className="text-gray-500 text-lg">分享观演快乐，寻找志同道合的演出搭子</p>
          <div className="flex items-center gap-4 pt-4 justify-center md:justify-start">
            <Link to="/social/buddies" className="px-6 py-3 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all flex items-center gap-2">
              <Users size={20} />找搭子
            </Link>
            <Link to="/social/tickets" className="px-6 py-3 bg-white text-gray-900 border border-gray-100 font-black rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
              <Ticket size={20} />票务集市
            </Link>
          </div>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索话题、用户或动态..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-16 pl-16 pr-6 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-primary/5 focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                <img 
                  src={currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest'} 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-1 space-y-4">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={currentUser ? "分享你的观演心得或寻找搭子..." : "请先登录后参与讨论"}
                  disabled={!currentUser}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-primary/20 transition-all resize-none h-32 text-lg"
                />
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {images.map((img, i) => (
                      <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden group">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        <button onClick={() => removeImage(i)} className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <button onClick={() => fileInputRef.current?.click()} disabled={!currentUser} className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-xl transition-all font-bold">
                  <Camera size={20} /><span>图片</span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                <span className="text-xs text-gray-400 font-medium">{content.length}/500</span>
              </div>
              <button onClick={handlePost} disabled={!currentUser} className="px-10 py-3 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50">
                <Send size={18} />发布动态
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.username}`} alt="" className="w-full h-full" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-gray-900">{post.username}</h3>
                        {currentUser && post.userId !== currentUser.id && (
                          <button onClick={() => toggleFollow(post.userId)} className={`text-xs font-black px-2 py-0.5 rounded-md ${isFollowing(post.userId) ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary'}`}>
                            {isFollowing(post.userId) ? '已关注' : '+ 关注'}
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 font-bold">{post.time}</p>
                    </div>
                  </div>
                  {currentUser && post.userId === currentUser.id && (
                    <button onClick={() => deletePost(post.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <div className={`grid gap-4 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {post.images.map((img: string, idx: number) => (
                      <img key={idx} src={img} alt="Post" className="w-full h-80 object-cover rounded-[32px] border border-gray-100 shadow-sm" />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-8 pt-4 border-t border-gray-50">
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group/btn">
                    <div className="p-2 group-hover/btn:bg-primary/5 rounded-xl transition-all"><Heart size={20} /></div>
                    <span className="font-black">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group/btn">
                    <div className="p-2 group-hover/btn:bg-primary/5 rounded-xl transition-all"><MessageSquare size={20} /></div>
                    <span className="font-black">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors group/btn ml-auto">
                    <div className="p-2 group-hover/btn:bg-primary/5 rounded-xl transition-all"><Share2 size={20} /></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-gray-900 flex items-center gap-2"><TrendingUp size={24} className="text-primary" />热门话题</h3>
            <div className="space-y-4">
              {[{ name: '周杰伦南京站', count: '2.5w' }, { name: '草莓音乐节攻略', count: '1.2w' }].map((topic) => (
                <div key={topic.name} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-gray-600 font-bold group-hover:text-primary transition-colors"># {topic.name}</span>
                  <span className="text-xs font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{topic.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSquare;
