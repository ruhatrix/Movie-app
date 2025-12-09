🎬 Movie Discovery App
A modern web application for discovering movies with real-time search, trending statistics, and personalized recommendations.

✨ Features
🔍 Real-time Movie Search - Search movies using The Movie Database (TMDB) API

📊 Trending Analytics - Track most searched movies using Appwrite backend

⚡ Debounced Search - Optimized performance with 600ms debouncing

🎨 Modern UI - Responsive design with gradient accents and smooth animations

📱 Mobile Responsive - Works seamlessly across all devices

⭐ Like System - Interactive movie cards with like functionality

🔄 Loading States - Elegant spinners and error handling

🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

npm or yarn

TMDB API key

Appwrite account

Installation
Clone the repository

bash
git clone https://github.com/ruhatrix/Movie-app/
cd movie-discovery-app
Install dependencies

bash
npm install

Set up environment variables
Create a .env file in the root directory:

env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_METRICS_ID=your_appwrite_metrics_id
Start the development server

bash
npm run dev

🛠️ Tech Stack
Frontend
React 18 - UI library

Vite - Build tool and dev server

Tailwind CSS - Utility-first styling

React Use - Custom hooks for debouncing

Backend & APIs
Appwrite - Backend server for analytics storage

The Movie Database (TMDB) - Movie data API

Fetch API - HTTP requests

Key Dependencies
appwrite - Backend integration

react-use - Custom React hooks

tailwindcss - Styling framework

📁 Project Structure
text
movie-discovery-app/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx      # Individual movie component
│   │   ├── Search.jsx         # Search input component
│   │   └── Spinner.jsx        # Loading spinner
│   ├── appwrite.js            # Appwrite service layer
│   ├── App.jsx                # Main application component
│   └── main.jsx               # Application entry point
├── public/
│   ├── logo.png               # Application logo
│   ├── hero-img.png           # Hero banner
│   ├── BG.png                 # Background image
│   └── star.png               # Favicon
├── .env                       # Environment variables
├── index.html                 # HTML template
└── package.json
🔧 API Integration
TMDB API
The app integrates with The Movie Database API to:

Fetch popular movies (/discover/movie)

Search movies (/search/movie)

Get movie details, posters, and metadata

Appwrite Backend
Appwrite is used to:

Store search analytics

Track trending movies

Persist user interaction data

🙏 Acknowledgments
Fetiya Yusuf   [@fafiyusuf]([https://github.com/fafiyusuf])
Lelo Muhammed  [@lu00009]([https://github.com/lu00009])
Temkin Abdulmelik [@Temkin236]([https://github.com/Temkin236])
Siham Kassim [@Sihamkassim]([https://github.com/Sihamkassim])
