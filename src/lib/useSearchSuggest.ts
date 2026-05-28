
import { useState, useEffect } from 'react';

export function useSearchSuggest<T>(
  query: string,
  dataSource: T[],
  fields: (keyof T)[]
) {
  const [suggestions, setSuggestions] = useState<T[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = dataSource.filter(item => {
      return fields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(query.toLowerCase());
        }
        return false;
      });
    }).slice(0, 5); // Limit to 5 suggestions

    setSuggestions(filtered);
  }, [query, dataSource, fields]);

  return suggestions;
}
