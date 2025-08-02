import { useState, useEffect, useCallback } from 'react';
import { getTopHeadlines, searchNews, CATEGORIES } from '../services/newsAPI';

/**
 * Custom hook for managing news data
 * @param {Object} options - Hook options
 * @param {string} options.initialCategory - Initial category to load
 * @param {number} options.pageSize - Number of articles per page
 * @returns {Object} News state and methods
 */
export const useNews = (options = {}) => {
  const {
    initialCategory = CATEGORIES.general,
    pageSize = 20,
  } = options;

  const [state, setState] = useState({
    articles: [],
    loading: true,
    error: null,
    totalResults: 0,
    currentPage: 1,
    category: initialCategory,
    searchQuery: '',
    isSearchMode: false,
  });

  /**
   * Update state with new data
   */
  const updateState = useCallback((updates) => {
    setState(prevState => ({ ...prevState, ...updates }));
  }, []);

  /**
   * Fetch top headlines for a category
   */
  const fetchHeadlines = useCallback(async (category = state.category, page = 1) => {
    updateState({ loading: true, error: null });

    try {
      const result = await getTopHeadlines({
        category,
        page,
        pageSize,
      });

      if (result.success) {
        updateState({
          articles: page === 1 ? result.articles : [...state.articles, ...result.articles],
          totalResults: result.totalResults,
          currentPage: page,
          category,
          loading: false,
          isSearchMode: false,
          searchQuery: '',
        });
      } else {
        updateState({
          loading: false,
          error: result.error,
        });
      }
    } catch (error) {
      updateState({
        loading: false,
        error: 'An unexpected error occurred',
      });
    }
  }, [state.category, state.articles, pageSize, updateState]);

  /**
   * Search for news articles
   */
  const searchArticles = useCallback(async (query, page = 1) => {
    if (!query.trim()) {
      // If query is empty, fetch headlines instead
      fetchHeadlines(state.category, 1);
      return;
    }

    updateState({ loading: true, error: null });

    try {
      const result = await searchNews({
        q: query,
        page,
        pageSize,
      });

      if (result.success) {
        updateState({
          articles: page === 1 ? result.articles : [...state.articles, ...result.articles],
          totalResults: result.totalResults,
          currentPage: page,
          searchQuery: query,
          loading: false,
          isSearchMode: true,
        });
      } else {
        updateState({
          loading: false,
          error: result.error,
        });
      }
    } catch (error) {
      updateState({
        loading: false,
        error: 'An unexpected error occurred while searching',
      });
    }
  }, [state.category, state.articles, pageSize, updateState, fetchHeadlines]);

  /**
   * Load more articles (pagination)
   */
  const loadMore = useCallback(() => {
    const nextPage = state.currentPage + 1;
    
    if (state.isSearchMode && state.searchQuery) {
      searchArticles(state.searchQuery, nextPage);
    } else {
      fetchHeadlines(state.category, nextPage);
    }
  }, [state.currentPage, state.isSearchMode, state.searchQuery, state.category, searchArticles, fetchHeadlines]);

  /**
   * Change category
   */
  const changeCategory = useCallback((newCategory) => {
    if (newCategory !== state.category) {
      fetchHeadlines(newCategory, 1);
    }
  }, [state.category, fetchHeadlines]);

  /**
   * Refresh current news
   */
  const refresh = useCallback(() => {
    if (state.isSearchMode && state.searchQuery) {
      searchArticles(state.searchQuery, 1);
    } else {
      fetchHeadlines(state.category, 1);
    }
  }, [state.isSearchMode, state.searchQuery, state.category, searchArticles, fetchHeadlines]);

  /**
   * Clear search and return to headlines
   */
  const clearSearch = useCallback(() => {
    fetchHeadlines(state.category, 1);
  }, [state.category, fetchHeadlines]);

  // Initial load
  useEffect(() => {
    fetchHeadlines(initialCategory, 1);
  }, [initialCategory]); // Only run on mount or when initialCategory changes

  return {
    // State
    articles: state.articles,
    loading: state.loading,
    error: state.error,
    totalResults: state.totalResults,
    currentPage: state.currentPage,
    category: state.category,
    searchQuery: state.searchQuery,
    isSearchMode: state.isSearchMode,
    hasMore: state.articles.length < state.totalResults,

    // Methods
    fetchHeadlines,
    searchArticles,
    loadMore,
    changeCategory,
    refresh,
    clearSearch,
  };
};