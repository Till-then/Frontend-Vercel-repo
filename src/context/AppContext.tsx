
import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  login: (username: string, password: string) => boolean;
  register: (data: any) => boolean;
  logout: () => void;
  
  // Follow
  following: number[];
  toggleFollow: (userId: number) => void;
  isFollowing: (userId: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('上海');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [reminders, setReminders] = useState<string[]>([]);
  
  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [following, setFollowing] = useState<number[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const login = (username: string, password: string): boolean => {
    // Demo login logic
    if (username === 'admin' && password === 'admin123') {
      const user: User = {
        id: 0,
        username: 'Admin',
        phone: '13800000000',
        email: 'admin@livejoy.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        isLoggedIn: true,
        role: 'admin'
      };
      setCurrentUser(user);
      return true;
    }
    
    if (username && password.length >= 6) {
      const user: User = {
        id: 1,
        username: username,
        phone: '13812345678',
        email: `${username}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        isLoggedIn: true,
        role: 'user'
      };
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (data: any): boolean => {
    const user: User = {
      id: Date.now(),
      username: data.username,
      phone: data.phone,
      email: data.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      isLoggedIn: true,
      role: 'user'
    };
    setCurrentUser(user);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleFollow = (userId: number) => {
    setFollowing(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const isFollowing = (userId: number) => following.includes(userId);

  return (
    <AppContext.Provider value={{ 
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
      following,
      toggleFollow,
      isFollowing
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
