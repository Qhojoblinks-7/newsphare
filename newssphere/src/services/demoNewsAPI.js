// Demo news data for testing without API key
const demoArticles = [
  {
    title: "Revolutionary Solar Technology Breakthrough in Kenya",
    description: "Scientists at Nairobi University have developed a new solar panel technology that increases efficiency by 40%, marking a significant advancement for renewable energy in Africa.",
    url: "https://example.com/solar-kenya",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
    publishedAt: "2024-12-20T10:30:00Z",
    source: { name: "Tech Africa Today" },
    author: "Dr. Amina Hassan"
  },
  {
    title: "Ghana's Digital Economy Shows 25% Growth in 2024",
    description: "The latest economic data reveals that Ghana's digital sector has experienced unprecedented growth, driven by fintech innovations and increased internet penetration.",
    url: "https://example.com/ghana-digital",
    urlToImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    publishedAt: "2024-12-20T08:15:00Z",
    source: { name: "African Business Weekly" },
    author: "Kwame Asante"
  },
  {
    title: "New Medical Research Center Opens in Lagos",
    description: "A state-of-the-art medical research facility focusing on tropical diseases and genomics has officially opened in Lagos, Nigeria, promising to advance healthcare across West Africa.",
    url: "https://example.com/lagos-medical",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    publishedAt: "2024-12-20T06:45:00Z",
    source: { name: "Health Africa Network" },
    author: "Dr. Folake Adebayo"
  },
  {
    title: "South African Startup Wins Global AI Competition",
    description: "A Cape Town-based artificial intelligence startup has won the prestigious Global AI Innovation Award for their work in agricultural technology and food security.",
    url: "https://example.com/sa-ai-startup",
    urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    publishedAt: "2024-12-19T16:20:00Z",
    source: { name: "Innovation Africa" },
    author: "Thabo Mthembu"
  },
  {
    title: "Morocco Launches Ambitious Green Hydrogen Project",
    description: "Morocco has announced a $10 billion green hydrogen initiative that aims to make the country a leading exporter of clean energy to Europe by 2030.",
    url: "https://example.com/morocco-hydrogen",
    urlToImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop",
    publishedAt: "2024-12-19T14:30:00Z",
    source: { name: "Energy Africa" },
    author: "Laila Benali"
  },
  {
    title: "Ethiopian Coffee Farmers Embrace Blockchain Technology",
    description: "Coffee farmers in Ethiopia are using blockchain technology to ensure fair trade practices and provide transparency in the supply chain from farm to cup.",
    url: "https://example.com/ethiopia-coffee-blockchain",
    urlToImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    publishedAt: "2024-12-19T12:00:00Z",
    source: { name: "Agricultural Tech Today" },
    author: "Meron Tadesse"
  }
];

// Mock API responses
export const mockTopHeadlines = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const { category = 'general', pageSize = 20, page = 1 } = params;
  
  // Filter articles based on category (simplified)
  let filteredArticles = [...demoArticles];
  
  if (category !== 'general') {
    // Simple category filtering based on keywords
    const categoryKeywords = {
      technology: ['technology', 'AI', 'blockchain', 'digital', 'tech'],
      health: ['medical', 'health', 'healthcare', 'research'],
      business: ['business', 'economy', 'economic', 'startup'],
      science: ['research', 'scientists', 'breakthrough', 'innovation'],
      sports: ['sports', 'football', 'soccer', 'athletics'],
    };
    
    const keywords = categoryKeywords[category] || [];
    filteredArticles = demoArticles.filter(article => 
      keywords.some(keyword => 
        article.title.toLowerCase().includes(keyword) ||
        article.description.toLowerCase().includes(keyword)
      )
    );
  }
  
  // Simulate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: {
      articles: paginatedArticles,
      totalResults: filteredArticles.length,
    },
    articles: paginatedArticles,
    totalResults: filteredArticles.length,
  };
};

export const mockSearchNews = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const { q, pageSize = 20, page = 1 } = params;
  
  if (!q || q.trim() === '') {
    return {
      success: false,
      error: 'Search query is required',
      articles: [],
      totalResults: 0,
    };
  }
  
  // Simple search implementation
  const searchTerm = q.toLowerCase().trim();
  const filteredArticles = demoArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm) ||
    article.description.toLowerCase().includes(searchTerm) ||
    article.author?.toLowerCase().includes(searchTerm) ||
    article.source.name.toLowerCase().includes(searchTerm)
  );
  
  // Simulate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
  return {
    success: true,
    data: {
      articles: paginatedArticles,
      totalResults: filteredArticles.length,
    },
    articles: paginatedArticles,
    totalResults: filteredArticles.length,
  };
};