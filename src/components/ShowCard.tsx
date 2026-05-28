
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Heart, Clock } from 'lucide-react';
import { Show } from '../data/mockData';
import { useAppContext } from '../context/AppContext';

interface ShowCardProps {
  show: Show;
}

export const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  const { favorites, toggleFavorite } = useAppContext();
  const isFavorite = favorites.includes(show.id);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={show.image} 
          alt={show.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg ${
            show.status === '售票中' ? 'bg-primary text-white' :
            show.status === '即将开票' ? 'bg-brand-amber text-white' :
            'bg-gray-500 text-white'
          }`}>
            {show.status}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(show.id);
          }}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            isFavorite ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-black/20 text-white hover:bg-white hover:text-primary'
          }`}
        >
          <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
        </button>

        {/* Quick View Info */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Link 
            to={`/show-detail?id=${show.id}`}
            className="w-full py-3 bg-white text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
          >
            查看详情
          </Link>
        </div>
      </div>

      <Link to={`/show-detail?id=${show.id}`} className="p-5 block space-y-3">
        <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest">
          <Clock size={12} />
          {show.type}
        </div>
        <h3 className="font-bold text-gray-900 line-clamp-2 h-12 leading-tight group-hover:text-primary transition-colors">
          {show.title}
        </h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Calendar size={14} className="text-gray-400" />
            {show.date}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <MapPin size={14} className="text-gray-400" />
            {show.city} · {show.venue}
          </div>
        </div>
        <div className="pt-2 flex items-baseline gap-1">
          <span className="text-[10px] font-bold text-gray-400">¥</span>
          <span className="text-xl font-black text-primary">{show.price}</span>
          <span className="text-[10px] font-bold text-gray-400">起</span>
        </div>
      </Link>
    </div>
  );
};
