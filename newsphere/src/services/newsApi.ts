import axios from 'axios';
import { NewsResponse, NewsCategory } from '../types/news';

const API_BASE_URL = 'https://newsapi.org/v2';
const API_KEY = process.env.REACT_APP_NEWS_API_KEY || '';

const newsApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-API-Key': API_KEY,
  },
});

export const getTopHeadlines = async (category?: NewsCategory, country: string = 'us') => {
  try {
    const params: any = { country };
    if (category && category !== 'general') {
      params.category = category;
    }
    
    const response = await newsApi.get('/top-headlines', { params });
    return response.data as NewsResponse;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Failed to fetch news');
    }
    throw new Error('Failed to fetch news');
  }
};

export const searchNews = async (query: string, page: number = 1) => {
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
    return response.data as NewsResponse;
  } catch (error: any) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Failed to search news');
    }
    throw new Error('Failed to search news');
  }
};

export const getNewsByCategory = async (category: NewsCategory) => {
  return getTopHeadlines(category);
};