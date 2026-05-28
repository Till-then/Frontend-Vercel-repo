
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface Suggestion {
  id: string;
  title: string;
  subtitle?: string;
  type?: string;
  data?: any;
}

interface SearchWithSuggestionsProps {
  placeholder: string;
  onSearch: (term: string) => void;
  suggestions: Suggestion[];
  onSuggestionClick: (suggestion: Suggestion) => void;
  className?: string;
  inputClassName?: string;
}

const SearchWithSuggestions: React.FC<SearchWithSuggestionsProps> = ({
  placeholder,
  onSearch,
  suggestions,
  onSuggestionClick,
  className = "",
  inputClassName = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative h-full">
        <input
          type="text"
          className={`w-full h-full pl-12 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${inputClassName}`}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {showSuggestions && searchTerm && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
              onClick={() => {
                onSuggestionClick(item);
                setSearchTerm(item.title);
                setShowSuggestions(false);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                  {item.subtitle && (
                    <div className="text-xs text-gray-500 mt-0.5">{item.subtitle}</div>
                  )}
                </div>
                {item.type && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded uppercase font-bold tracking-wider">
                    {item.type}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchWithSuggestions;
