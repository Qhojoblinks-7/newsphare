import axios from 'axios';

const API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';

const newsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
  },
});

export const getTopHeadlines = async (category, country = 'us') => {
  try {
    const params = { country };
    if (category && category !== 'general') {
      params.category = category;
    }
    
    const response = await newsApi.get('/top-headlines', { params });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Failed to fetch news');
    }
    throw new Error('Failed to fetch news');
  }
};

export const searchNews = async (query, page = 1) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        page,
        pageSize: 20,
        sortBy: 'publishedAt',
        language: 'en',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Failed to search news');
    }
    throw new Error('Failed to search news');
  }
};

export const getNewsByCategory = async (category) => {
  return getTopHeadlines(category);
};