const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
const internData = {
  id: 1,
  name: "Rubina Hakim",
  email: "rubinahakim95@gmail.com",
  referralCode: "rubina2025",
  totalDonations: 12750,
  joinDate: "2024-09-15",
  avatar: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
  achievements: [
    { id: 1, title: "First Donation", description: "Made your first successful referral", unlocked: true, icon: "🎯" },
    { id: 2, title: "Rising Star", description: "Raised over $5,000", unlocked: true, icon: "⭐" },
    { id: 3, title: "Team Player", description: "Raised over $10,000", unlocked: true, icon: "🤝" },
    { id: 4, title: "Super Fundraiser", description: "Raise over $25,000", unlocked: false, icon: "🏆" },
    { id: 5, title: "Legend", description: "Raise over $50,000", unlocked: false, icon: "👑" }
  ],
  recentActivity: [
    { id: 1, type: "donation", amount: 150, date: "2024-12-20", donor: "Sarah M." },
    { id: 2, type: "donation", amount: 75, date: "2024-12-19", donor: "Mike R." },
    { id: 3, type: "donation", amount: 200, date: "2024-12-18", donor: "Emily K." },
    { id: 4, type: "achievement", title: "Team Player", date: "2024-12-17" }
  ]
};

const leaderboard = [
  { id: 1, name: "Alex Johnson", amount: 12750, rank: 1 },
  { id: 2, name: "Sarah Wilson", amount: 11200, rank: 2 },
  { id: 3, name: "Mike Chen", amount: 9800, rank: 3 },
  { id: 4, name: "Emma Davis", amount: 8500, rank: 4 },
  { id: 5, name: "James Miller", amount: 7300, rank: 5 }
];

// Routes
app.get('/api/intern', (req, res) => {
  res.json({
    success: true,
    data: internData
  });
});

app.get('/api/leaderboard', (req, res) => {
  res.json({
    success: true,
    data: leaderboard
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Dummy login - accept any email/password
  if (email && password) {
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: internData.id,
        name: internData.name,
        email: internData.email
      },
      token: "dummy-jwt-token-12345"
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }
});

app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  // Dummy signup - accept any valid data
  if (name && email && password) {
    res.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: 2,
        name,
        email
      },
      token: "dummy-jwt-token-67890"
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Name, email and password are required"
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});