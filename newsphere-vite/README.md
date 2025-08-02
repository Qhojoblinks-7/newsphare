# NewsSphere (Vite Version)

**Connecting Africa, One Headline at a Time**

A modern news reader application built with Vite and React, designed to bring real-time, accurate, and relevant news updates directly to users. NewsSphere emphasizes personalized search options and representation of African perspectives, offering a more inclusive and intuitive user experience.

## 🌟 Features

- **Real-Time News Updates**: Fetch and display live headlines from trusted sources
- **Category Filters**: Explore specific topics like Health, Technology, Education, and more
- **Search Functionality**: Keyword-based search for articles
- **Responsive Design**: Compatible with both desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with Tailwind CSS
- **Article Details**: Full article view with metadata and external links
- **Fast Development**: Built with Vite for lightning-fast development experience

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- NewsAPI key (get one from [https://newsapi.org/](https://newsapi.org/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd newsphere-vite
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
VITE_NEWS_API_KEY=your_news_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The application will open at [http://localhost:5173](http://localhost:5173).

## 🛠️ Technology Stack

- **Frontend**: React 19 with JSX
- **Build Tool**: Vite
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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── NewsCard.jsx
│   ├── CategoryFilter.jsx
│   └── LoadingSpinner.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── SearchPage.jsx
│   └── ArticlePage.jsx
├── services/           # API services
│   └── newsApi.js
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Vercel
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## ⚡ Vite Benefits

- **Lightning Fast**: Instant server start and hot module replacement
- **Optimized Builds**: Faster build times and smaller bundle sizes
- **Modern Tooling**: Built with modern web standards
- **Plugin Ecosystem**: Rich plugin ecosystem for extensibility

## 📋 Future Improvements

- [ ] User accounts and personalized news
- [ ] Bookmarking functionality
- [ ] Offline access capabilities
- [ ] Push notifications for breaking news
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] PWA capabilities

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
- [Vite](https://vitejs.dev/) for the fast build tool
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [React](https://reactjs.org/) for the frontend framework
- [Lucide](https://lucide.dev/) for the beautiful icons

---

**NewsSphere** - Connecting Africa, One Headline at a Time
