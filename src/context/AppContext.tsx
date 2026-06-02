
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Post, Show, Venue } from '../data/mockData';
// --- 原本地兜底数据（保留为注释，便于回退） ---
// import { MOCK_POSTS, SHOWS as MOCK_SHOWS, VENUES as MOCK_VENUES } from '../data/mockData';
import * as authApi from '../api/auth';
import * as postsApi from '../api/posts';
import * as usersApi from '../api/users';
import * as showsApi from '../api/shows';
import * as venuesApi from '../api/venues';
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

  // Shows（全局共享，新增/修改/删除会立刻反映到首页 / 搜索页 / 后台）
  shows: Show[];
  refreshShows: () => Promise<void>;
  addShow: (payload: Omit<Show, 'id'>) => Promise<Show | null>;
  editShow: (id: string, payload: Partial<Show>) => Promise<Show | null>;
  removeShow: (id: string) => Promise<void>;

  // Venues（同上）
  venues: Venue[];
  refreshVenues: () => Promise<void>;
  addVenue: (payload: Omit<Venue, 'id'>) => Promise<Venue | null>;
  editVenue: (id: string, payload: Partial<Venue>) => Promise<Venue | null>;
  removeVenue: (id: string) => Promise<void>;
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

  // Posts / Shows / Venues 全局列表
  const [posts, setPosts] = useState<Post[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);

  // 拉取演出 / 场馆（提供给上层手动刷新）
  const refreshShows = useCallback(async () => {
    try {
      const data = await showsApi.listShows();
      setShows(data);
    } catch {
      // --- 原本地逻辑 ---
      // setShows(MOCK_SHOWS);
      setShows([]);
    }
  }, []);

  const refreshVenues = useCallback(async () => {
    try {
      const data = await venuesApi.listVenues();
      setVenues(data);
    } catch {
      // --- 原本地逻辑 ---
      // setVenues(MOCK_VENUES);
      setVenues([]);
    }
  }, []);

  // 初始化：拉取帖子 / 关注列表（如果已登录）/ 演出 / 场馆
  useEffect(() => {
    // --- 原本地逻辑 ---
    // setPosts(MOCK_POSTS);
    // setFollowing([101]);
    // setFollowers([102]);
    // setShows(MOCK_SHOWS);
    // setVenues(MOCK_VENUES);

    postsApi
      .listPosts()
      .then(setPosts)
      .catch(() => setPosts([]));

    refreshShows();
    refreshVenues();

    if (tokenStore.get()) {
      Promise.all([usersApi.listFollowing(), usersApi.listFollowers()])
        .then(([fg, fr]) => {
          setFollowing(fg);
          setFollowers(fr);
        })
        .catch(() => {
          // --- 原本地逻辑 ---
          // setFollowing([101]);
          // setFollowers([102]);
          setFollowing([]);
          setFollowers([]);
        });
    } else {
      // --- 原本地逻辑 ---
      // setFollowing([101]);
      // setFollowers([102]);
      setFollowing([]);
      setFollowers([]);
    }
  }, [refreshShows, refreshVenues]);

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

  /**
   * 演出 CRUD（后台）—— 真实后端
   *
   * --- 原本地逻辑 ---
   * setShows(prev => [{...payload, id: `s${Date.now()}`} as Show, ...prev]);
   * setShows(prev => prev.map(s => s.id === id ? {...s, ...payload} : s));
   * setShows(prev => prev.filter(s => s.id !== id));
   */
  const addShow = async (payload: Omit<Show, 'id'>): Promise<Show | null> => {
    try {
      const created = await showsApi.createShow(payload);
      setShows((prev) => [created, ...prev]);
      return created;
    } catch {
      return null;
    }
  };

  const editShow = async (id: string, payload: Partial<Show>): Promise<Show | null> => {
    try {
      const updated = await showsApi.updateShow(id, payload);
      setShows((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
      return updated;
    } catch {
      return null;
    }
  };

  const removeShow = async (id: string) => {
    const snapshot = shows;
    setShows((prev) => prev.filter((s) => s.id !== id));
    try {
      await showsApi.deleteShow(id);
    } catch {
      setShows(snapshot); // 回滚
    }
  };

  /**
   * 场馆 CRUD（后台）—— 真实后端
   *
   * --- 原本地逻辑 ---
   * setVenues(prev => [{...payload, id: `v${Date.now()}`} as Venue, ...prev]);
   */
  const addVenue = async (payload: Omit<Venue, 'id'>): Promise<Venue | null> => {
    try {
      const created = await venuesApi.createVenue(payload);
      setVenues((prev) => [created, ...prev]);
      return created;
    } catch {
      return null;
    }
  };

  const editVenue = async (id: string, payload: Partial<Venue>): Promise<Venue | null> => {
    try {
      const updated = await venuesApi.updateVenue(id, payload);
      setVenues((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
      return updated;
    } catch {
      return null;
    }
  };

  const removeVenue = async (id: string) => {
    const snapshot = venues;
    setVenues((prev) => prev.filter((v) => v.id !== id));
    try {
      await venuesApi.deleteVenue(id);
    } catch {
      setVenues(snapshot); // 回滚
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
        shows,
        refreshShows,
        addShow,
        editShow,
        removeShow,
        venues,
        refreshVenues,
        addVenue,
        editVenue,
        removeVenue,
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
