# NewsSphere 📰

**Connecting Africa, One Headline at a Time**

NewsSphere is a modern, responsive news reader application built with React and Tailwind CSS. It provides real-time news updates from trusted sources worldwide, with a special focus on promoting African perspectives and representation in global news.

![NewsSphere Screenshot](./screenshot.png)

## 🌟 Features

- **Real-Time News Updates**: Fetch the latest headlines from NewsAPI
- **Category Filtering**: Browse news by categories (Technology, Health, Business, Sports, etc.)
- **Smart Search**: Search for specific topics with debounced input
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Share Articles**: Native sharing support with fallback options
- **Loading States**: Skeleton loaders and proper error handling
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **API**: NewsAPI.org

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager
- A NewsAPI key (free at [newsapi.org](https://newsapi.org/))

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd newssphere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your NewsAPI key:
   ```env
   VITE_NEWS_API_KEY=your-actual-api-key-here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔑 Getting a NewsAPI Key

1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

**Note**: The free tier includes 1,000 requests per day, which is sufficient for development and testing.

## 📱 Responsive Design

NewsSphere is fully responsive and works seamlessly across:
- 📱 Mobile phones (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop computers (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🌍 African Focus

While NewsSphere provides global news coverage, it emphasizes:
- African news sources and perspectives
- Regional coverage for African countries
- Culturally relevant content filtering
- Support for African time zones and date formats

## 🎨 Design System

The application uses a carefully crafted design system:
- **Colors**: Warm orange primary palette (#f97316)
- **Typography**: Inter font family for optimal readability
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable, accessible components

## 📊 Project Structure

```
newssphere/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── NewsCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useNews.js
│   ├── services/           # API services
│   │   └── newsAPI.js
│   ├── utils/              # Utility functions
│   │   └── helpers.js
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

## 🔧 Configuration

### Environment Variables

- `VITE_NEWS_API_KEY`: Your NewsAPI key (required)

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended typography
- Responsive breakpoints
- Custom component classes

## 📈 Performance

- **Lazy Loading**: Images are loaded lazily for better performance
- **Debounced Search**: Search input is debounced to reduce API calls
- **Efficient Rendering**: Optimized React components with proper keys
- **Responsive Images**: Proper image sizing and fallbacks

## 🐛 Error Handling

- **Network Errors**: Graceful handling of connectivity issues
- **API Errors**: User-friendly error messages
- **Rate Limiting**: Proper feedback for API limits
- **Image Errors**: Fallback placeholders for broken images

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set `VITE_NEWS_API_KEY` in environment variables
3. Deploy automatically on push

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Immanuel Eshun Quansah**  
Accra Technical University  
Computer Science Department  

## 🙏 Acknowledgments

- [NewsAPI](https://newsapi.org/) for providing the news data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Lucide](https://lucide.dev/) for the beautiful icons
- [React](https://reactjs.org/) team for the amazing framework

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Bookmarking articles
- [ ] Offline reading capability
- [ ] Push notifications
- [ ] Dark mode support
- [ ] Social media integration
- [ ] Comments and discussions
- [ ] Personal news feed customization

---

**NewsSphere** - Making news accessible, relevant, and engaging for everyone. 🌍✨
