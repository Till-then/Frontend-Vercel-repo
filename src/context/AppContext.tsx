
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Post, MOCK_POSTS } from '../data/mockData';
import * as authApi from '../api/auth';
import * as postsApi from '../api/posts';
import * as usersApi from '../api/users';
import { tokenStore } from '../lib/request';

export interface User {
  id: number;
  username: string;
  phone: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
  role?: 'admin' | 'user';
}

interface AppContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  reminders: string[];
  toggleReminder: (id: string) => void;

  // Auth
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: any) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;

  // Follow
  following: number[];
  followers: number[];
  toggleFollow: (userId: number) => Promise<void>;
  isFollowing: (userId: number) => boolean;

  // Posts
  posts: Post[];
  addPost: (content: string, images: string[]) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('上海');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [following, setFollowing] = useState<number[]>([]);
  const [followers, setFollowers] = useState<number[]>([]);

  // Posts State
  const [posts, setPosts] = useState<Post[]>([]);

  // 初始化：拉取帖子 / 关注列表（如果已登录）
  useEffect(() => {
    // --- 原本地逻辑 ---
    // setPosts(MOCK_POSTS);
    // setFollowing([101]);
    // setFollowers([102]);

    postsApi
      .listPosts()
      .then(setPosts)
      .catch(() => setPosts(MOCK_POSTS)); // 网络失败时回退到 mock

    if (tokenStore.get()) {
      Promise.all([usersApi.listFollowing(), usersApi.listFollowers()])
        .then(([fg, fr]) => {
          setFollowing(fg);
          setFollowers(fr);
        })
        .catch(() => {
          setFollowing([101]);
          setFollowers([102]);
        });
    } else {
      setFollowing([101]);
      setFollowers([102]);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  /**
   * 登录
   * 真实后端：调用 authApi.login -> 持久化 token -> 拉取关注列表
   *
   * --- 原本地测试逻辑（保留作 fallback 参考） ---
   * if (username === 'admin' && password === 'admin123') {
   *   const user: User = {
   *     id: 0, username: 'Admin', phone: '13800000000',
   *     email: 'admin@livejoy.com',
   *     avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
   *     isLoggedIn: true, role: 'admin',
   *   };
   *   setCurrentUser(user);
   *   return true;
   * }
   * if (username && password.length >= 6) {
   *   const user: User = {
   *     id: 1, username, phone: '13812345678',
   *     email: `${username}@example.com`,
   *     avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
   *     isLoggedIn: true, role: 'user',
   *   };
   *   setCurrentUser(user);
   *   return true;
   * }
   * return false;
   */
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const { user } = await authApi.login({ username, password });
      setCurrentUser(user);
      // 登录后刷新关注 / 粉丝
      try {
        const [fg, fr] = await Promise.all([
          usersApi.listFollowing(),
          usersApi.listFollowers(),
        ]);
        setFollowing(fg);
        setFollowers(fr);
      } catch {
        /* ignore */
      }
      return true;
    } catch {
      return false;
    }
  };

  /**
   * 注册
   * 真实后端：authApi.register
   *
   * --- 原本地逻辑 ---
   * const user: User = {
   *   id: Date.now(), username: data.username, phone: data.phone,
   *   email: data.email,
   *   avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
   *   isLoggedIn: true, role: 'user',
   * };
   * setCurrentUser(user);
   * return true;
   */
  const register = async (data: any): Promise<boolean> => {
    try {
      const { user } = await authApi.register({
        username: data.username,
        password: data.password,
        phone: data.phone,
        email: data.email,
      });
      setCurrentUser(user);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * 退出登录
   * 真实后端：authApi.logout（清 token）
   *
   * --- 原本地逻辑 ---
   * setCurrentUser(null);
   */
  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setCurrentUser(null);
    }
  };

  /**
   * 更新当前用户资料
   * 真实后端：authApi.updateProfile
   *
   * --- 原本地逻辑 ---
   * if (currentUser) setCurrentUser({ ...currentUser, ...data });
   */
  const updateUser = async (data: Partial<User>) => {
    if (!currentUser) return;
    try {
      const updated = await authApi.updateProfile(data);
      setCurrentUser({ ...currentUser, ...updated, ...data });
    } catch {
      // 失败时保持本地更新，避免阻塞 UI
      setCurrentUser({ ...currentUser, ...data });
    }
  };

  /**
   * 关注 / 取消关注
   * 真实后端：usersApi.follow / unfollow
   *
   * --- 原本地逻辑 ---
   * setFollowing(prev =>
   *   prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
   * );
   */
  const toggleFollow = async (userId: number) => {
    const already = following.includes(userId);
    // 乐观更新
    setFollowing((prev) =>
      already ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
    try {
      if (already) await usersApi.unfollow(userId);
      else await usersApi.follow(userId);
    } catch {
      // 回滚
      setFollowing((prev) =>
        already ? [...prev, userId] : prev.filter((id) => id !== userId)
      );
    }
  };

  const isFollowing = (userId: number) => following.includes(userId);

  /**
   * 发帖
   * 真实后端：postsApi.createPost
   *
   * --- 原本地逻辑 ---
   * const newPost: Post = {
   *   id: `p${Date.now()}`,
   *   userId: currentUser.id,
   *   username: currentUser.username,
   *   content, images,
   *   likes: 0, comments: 0,
   *   time: new Date().toLocaleString(),
   *   status: '已通过',
   * };
   * setPosts(prev => [newPost, ...prev]);
   */
  const addPost = async (content: string, images: string[]) => {
    if (!currentUser) return;
    try {
      const created = await postsApi.createPost({
        userId: currentUser.id,
        username: currentUser.username,
        content,
        images,
      });
      setPosts((prev) => [created, ...prev]);
    } catch {
      /* 创建失败：保持原列表 */
    }
  };

  /**
   * 删除帖子
   * 真实后端：postsApi.deletePost
   *
   * --- 原本地逻辑 ---
   * setPosts(prev => prev.filter(p => p.id !== postId))
   */
  const deletePost = async (postId: string) => {
    const snapshot = posts;
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    try {
      await postsApi.deletePost(postId);
    } catch {
      setPosts(snapshot); // 回滚
    }
  };

  /**
   * 点赞
   * 真实后端：postsApi.likePost -> { likes }
   *
   * --- 原本地逻辑 ---
   * setPosts(prev => prev.map(p =>
   *   p.id === postId ? { ...p, likes: p.likes + 1 } : p
   * ));
   */
  const toggleLike = async (postId: string) => {
    // 乐观更新
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
    try {
      const res = await postsApi.likePost(postId);
      if (res.likes >= 0) {
        setPosts((prev) =>
          prev.map((p) => (p.id === postId ? { ...p, likes: res.likes } : p))
        );
      }
    } catch {
      // 回滚 +1
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, likes: Math.max(0, p.likes - 1) } : p
        )
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        favorites,
        toggleFavorite,
        reminders,
        toggleReminder,
        currentUser,
        login,
        register,
        logout,
        updateUser,
        following,
        followers,
        toggleFollow,
        isFollowing,
        posts,
        addPost,
        deletePost,
        toggleLike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
