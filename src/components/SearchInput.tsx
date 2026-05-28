
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (value: string) => void;
  searchTerm: string;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  onSelect,
  searchTerm,
  placeholder = "搜索...",
  className = ""
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.length >= 2) {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => Math.min(prev + 1, filteredSuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0) {
        handleSelect(filteredSuggestions[activeIndex]);
      } else {
        onSelect(inputValue);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    onSelect(value);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-[#10B981] font-bold">{part}</span>
          ) : part
        )}
      </span>
    );
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full h-14 pl-12 pr-12 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-primary/5 focus:outline-none focus:border-primary/50 transition-all"
        />
        {inputValue && (
          <button 
            onClick={() => { setInputValue(''); onSelect(''); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="py-2">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSelect(suggestion)}
                className={`px-6 py-3 cursor-pointer transition-colors flex items-center gap-3 ${
                  index === activeIndex ? 'bg-gray-50' : 'hover:bg-gray-50'
                }`}
              >
                <Search size={14} className="text-gray-400" />
                <span className="text-gray-700">{highlightMatch(suggestion, inputValue)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
