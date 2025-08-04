# Intern Portal - Full Stack Application

A beautiful, production-ready intern dashboard with fundraising tracking, achievements, and leaderboard functionality.

## Features

### Frontend
- 🔐 **Authentication System** - Clean login/signup interface with form validation
- 📊 **Interactive Dashboard** - Real-time metrics and fundraising overview
- 🏆 **Achievements System** - Visual progress tracking with unlockable rewards
- 📋 **Leaderboard** - Competitive ranking system
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- ✨ **Modern UI/UX** - Smooth animations and micro-interactions

### Backend
- 🚀 **RESTful API** - Express.js server with CORS support
- 📦 **Dummy Data** - Pre-populated intern profiles and achievements
- 🔗 **Easy Integration** - Simple API endpoints for frontend consumption
- 🛡️ **Error Handling** - Comprehensive error responses

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development servers**:
   ```bash
   npm run dev
   ```
   
   This command starts both the backend server (port 3001) and frontend development server (port 5173) concurrently.

3. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

### Alternative: Start servers separately

If you prefer to run servers individually:

```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend development server  
npm run client
```

## API Endpoints

### Authentication
- `POST /api/login` - User login (accepts any email/password)
- `POST /api/signup` - User registration

### Data
- `GET /api/intern` - Get intern profile data
- `GET /api/leaderboard` - Get leaderboard rankings
- `GET /health` - Health check endpoint

## Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard interface
│   ├── LoginForm.tsx    # Authentication form
│   ├── Header.tsx       # Navigation header
│   └── LoadingSpinner.tsx # Loading component
├── services/
│   └── api.ts          # API service layer
├── types/
│   └── index.ts        # TypeScript interfaces
└── App.tsx             # Main application component

server/
└── server.js           # Express.js backend server
```

## Demo Credentials

Since this uses dummy authentication, you can log in with any email and password combination:

- **Email**: any valid email format
- **Password**: any password

## Features Showcase

### 🎯 **Smart Dashboard**
- Real-time donation tracking
- Achievement progress visualization  
- Activity timeline
- Referral code management with one-click copying

### 🏆 **Gamification**
- Progressive achievement system
- Visual progress indicators
- Competitive leaderboard
- Reward unlocking mechanics

### 🎨 **Modern Design**
- Clean, professional interface
- Smooth hover effects and transitions
- Consistent color system and typography
- Mobile-first responsive design

### 🔧 **Developer Experience**
- TypeScript for type safety
- Modular component architecture
- Concurrent development servers
- Hot reload for rapid development

## Deployment

### Frontend (Vite Build)
```bash
npm run build
npm run preview
```

### Backend (Production)
```bash
NODE_ENV=production node server/server.js
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.