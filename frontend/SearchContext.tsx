import React, { createContext, useState, useContext, ReactNode } from 'react';
import { recipes } from '@/data/recipes';
import { workouts } from '@/data/workouts';
import { recoveryItems } from '@/data/recovery';
import { shopItems } from '@/data/shop';

// Define the types for search results
export type SearchResult = {
  id: string;
  title: string;
  type: 'recipe' | 'workout' | 'recovery' | 'shop';
  image?: string;
  path: string;
};

// Define the search context type
type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
  performSearch: (query: string) => void;
};

// Create the context with default values
export const SearchContext = createContext<SearchContextType>({
  searchQuery: '',
  setSearchQuery: () => {},
  searchResults: [],
  isSearchActive: false,
  setIsSearchActive: () => {},
  performSearch: () => {},
});

// Custom hook to use the search context
export const useSearch = () => useContext(SearchContext);

// Provider component
export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Function to perform search across all data sources
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase().trim();
    
    // Search in recipes
    const recipeResults = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(normalizedQuery) || 
      recipe.description.toLowerCase().includes(normalizedQuery) ||
      (recipe.dietType && recipe.dietType.toLowerCase().includes(normalizedQuery))
    ).map(recipe => ({
      id: recipe.slug,
      title: recipe.title,
      type: 'recipe' as const,
      image: recipe.heroImage,
      path: `/nutrition/${recipe.slug}`
    }));

    // Search in workouts
    const workoutResults = workouts.filter(workout => 
      workout.title.toLowerCase().includes(normalizedQuery) || 
      workout.description.toLowerCase().includes(normalizedQuery) ||
      (workout.category && workout.category.toLowerCase().includes(normalizedQuery)) ||
      (workout.workoutType && workout.workoutType.toLowerCase().includes(normalizedQuery))
    ).map(workout => ({
      id: workout.slug,
      title: workout.title,
      type: 'workout' as const,
      image: workout.videoUrl,
      path: `/fitness/${workout.slug}`
    }));

    // Search in recovery items
    const recoveryResults = recoveryItems.filter(item => 
      item.title.toLowerCase().includes(normalizedQuery) || 
      item.description.toLowerCase().includes(normalizedQuery) ||
      (item.category && item.category.toLowerCase().includes(normalizedQuery)) ||
      (item.recoveryType && item.recoveryType.toLowerCase().includes(normalizedQuery))
    ).map(item => ({
      id: item.slug,
      title: item.title,
      type: 'recovery' as const,
      image: item.videoUrl,
      path: `/recovery/${item.slug}`
    }));

    // Search in shop items
    const shopResults = shopItems.filter(item => 
      item.name.toLowerCase().includes(normalizedQuery) || 
      item.description.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    ).map(item => ({
      id: item.id,
      title: item.name,
      type: 'shop' as const,
      image: item.imageUrl,
      path: `/shop/${item.category}?id=${item.id}`
    }));

    // Combine all results
    setSearchResults([
      ...recipeResults,
      ...workoutResults,
      ...recoveryResults,
      ...shopResults
    ]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchActive,
        setIsSearchActive,
        performSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};