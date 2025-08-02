import axios from 'axios';
import { mockTopHeadlines, mockSearchNews } from './demoNewsAPI';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'your-api-key-here';
const BASE_URL = 'https://newsapi.org/v2';

// Check if we should use demo mode
const USE_DEMO_MODE = !API_KEY || API_KEY === 'your-api-key-here' || API_KEY === 'demo-api-key-limited-use';

// Create axios instance with base configuration
const newsAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
  },
});

// Available categories for NewsSphere
export const CATEGORIES = {
  general: 'general',
  business: 'business',
  entertainment: 'entertainment',
  health: 'health',
  science: 'science',
  sports: 'sports',
  technology: 'technology',
};

// Available countries with focus on Africa
export const COUNTRIES = {
  us: 'us', // For general international news
  za: 'za', // South Africa
  ng: 'ng', // Nigeria
  eg: 'eg', // Egypt
  ke: 'ke', // Kenya
  ma: 'ma', // Morocco
};

/**
 * Fetch top headlines
 * @param {Object} params - Query parameters
 * @param {string} params.category - News category
 * @param {string} params.country - Country code
 * @param {number} params.pageSize - Number of articles per page
 * @param {number} params.page - Page number
 */
export const getTopHeadlines = async (params = {}) => {
  // Use demo mode if API key is not configured
  if (USE_DEMO_MODE) {
    console.log('🎭 Demo mode: Using mock news data');
    return mockTopHeadlines(params);
  }

  try {
    const {
      category = CATEGORIES.general,
      country = COUNTRIES.us,
      pageSize = 20,
      page = 1,
    } = params;

    const response = await newsAPI.get('/top-headlines', {
      params: {
        category,
        country,
        pageSize,
        page,
      },
    });

    return {
      success: true,
      data: response.data,
      articles: response.data.articles || [],
      totalResults: response.data.totalResults || 0,
    };
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    
    // Fallback to demo mode on API errors
    if (error.response?.status === 401 || error.response?.status === 429) {
      console.log('🎭 Falling back to demo mode due to API issues');
      return mockTopHeadlines(params);
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch news',
      articles: [],
      totalResults: 0,
    };
  }
};

/**
 * Search for news articles
 * @param {Object} params - Search parameters
 * @param {string} params.q - Search query
 * @param {string} params.sortBy - Sort criteria (relevancy, popularity, publishedAt)
 * @param {number} params.pageSize - Number of articles per page
 * @param {number} params.page - Page number
 * @param {string} params.language - Language code
 */
export const searchNews = async (params = {}) => {
  // Use demo mode if API key is not configured
  if (USE_DEMO_MODE) {
    console.log('🎭 Demo mode: Using mock search data');
    return mockSearchNews(params);
  }

  try {
    const {
      q,
      sortBy = 'relevancy',
      pageSize = 20,
      page = 1,
      language = 'en',
    } = params;

    if (!q || q.trim() === '') {
      throw new Error('Search query is required');
    }

    const response = await newsAPI.get('/everything', {
      params: {
        q: q.trim(),
        sortBy,
        pageSize,
        page,
        language,
      },
    });

    return {
      success: true,
      data: response.data,
      articles: response.data.articles || [],
      totalResults: response.data.totalResults || 0,
    };
  } catch (error) {
    console.error('Error searching news:', error);
    
    // Fallback to demo mode on API errors
    if (error.response?.status === 401 || error.response?.status === 429) {
      console.log('🎭 Falling back to demo mode due to API issues');
      return mockSearchNews(params);
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to search news',
      articles: [],
      totalResults: 0,
    };
  }
};

/**
 * Get news from specific sources
 * @param {Object} params - Source parameters
 * @param {string} params.sources - Comma-separated source IDs
 * @param {number} params.pageSize - Number of articles per page
 * @param {number} params.page - Page number
 */
export const getNewsBySources = async (params = {}) => {
  // Use demo mode if API key is not configured
  if (USE_DEMO_MODE) {
    console.log('🎭 Demo mode: Using mock headlines data');
    return mockTopHeadlines(params);
  }

  try {
    const {
      sources,
      pageSize = 20,
      page = 1,
    } = params;

    if (!sources) {
      throw new Error('Sources parameter is required');
    }

    const response = await newsAPI.get('/top-headlines', {
      params: {
        sources,
        pageSize,
        page,
      },
    });

    return {
      success: true,
      data: response.data,
      articles: response.data.articles || [],
      totalResults: response.data.totalResults || 0,
    };
  } catch (error) {
    console.error('Error fetching news by sources:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch news from sources',
      articles: [],
      totalResults: 0,
    };
  }
};

/**
 * Get available news sources
 * @param {Object} params - Filter parameters
 * @param {string} params.category - Category filter
 * @param {string} params.language - Language filter
 * @param {string} params.country - Country filter
 */
export const getSources = async (params = {}) => {
  // Demo mode doesn't support sources endpoint
  if (USE_DEMO_MODE) {
    return {
      success: true,
      data: { sources: [] },
      sources: [],
    };
  }

  try {
    const response = await newsAPI.get('/sources', {
      params,
    });

    return {
      success: true,
      data: response.data,
      sources: response.data.sources || [],
    };
  } catch (error) {
    console.error('Error fetching sources:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch sources',
      sources: [],
    };
  }
};

export default newsAPI;