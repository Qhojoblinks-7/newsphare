# NewsSphere

**Connecting Africa, One Headline at a Time**

A modern news reader application designed to bring real-time, accurate, and relevant news updates directly to users. NewsSphere emphasizes personalized search options and representation of African perspectives, offering a more inclusive and intuitive user experience.

## 🌟 Features

- **Real-Time News Updates**: Fetch and display live headlines from trusted sources
- **Category Filters**: Explore specific topics like Health, Technology, Education, and more
- **Search Functionality**: Keyword-based search for articles
- **Responsive Design**: Compatible with both desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Article Details**: Full article view with metadata and external links

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- NewsAPI key (get one from [https://newsapi.org/](https://newsapi.org/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd newsphere
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your NewsAPI key:
```
REACT_APP_NEWS_API_KEY=your_news_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## 🛠️ Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: NewsAPI.org

## 📱 Usage

### Home Page
- Browse news by categories using the filter buttons
- Click on any article card to read more
- Use the search bar in the header for quick searches

### Search Page
- Enter keywords to search for specific articles
- View search results with article previews
- Navigate to full articles or original sources

### Article Page
- Read full article content
- View article metadata (author, date, source)
- Access the original article via external link

## 🎨 Design Features

- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Modern UI**: Clean design with smooth transitions
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

## 📊 API Integration

NewsSphere uses the NewsAPI.org service to fetch:
- Top headlines by category
- Search results for keywords
- Article metadata and content

### API Endpoints Used
- `/top-headlines` - Get latest news by category
- `/everything` - Search articles by keywords

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── NewsCard.tsx
│   ├── CategoryFilter.tsx
│   └── LoadingSpinner.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   └── ArticlePage.tsx
├── services/           # API services
│   └── newsApi.ts
├── types/              # TypeScript type definitions
│   └── news.ts
└── App.tsx            # Main application component
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

## 📋 Future Improvements

- [ ] User accounts and personalized news
- [ ] Bookmarking functionality
- [ ] Offline access capabilities
- [ ] Push notifications for breaking news
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Advanced filtering options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Immanuel Eshun Quansah**
- Institution: Accra Technical University
- Date: December 2024

## 🙏 Acknowledgments

- [NewsAPI.org](https://newsapi.org/) for providing the news data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**NewsSphere** - Connecting Africa, One Headline at a Time
