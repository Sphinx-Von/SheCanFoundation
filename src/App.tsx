import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ApiService } from './services/api';

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (err) {
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: any = await ApiService.login(email, password);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response: any = await ApiService.signup(name, email, password);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please make sure the backend is running.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  return (
    <Router>
      <div className="App">
        {error && (
          <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
            <p className="text-sm">{error}</p>
            <button
              onClick={() => setError(null)}
              className="absolute top-1 right-2 text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}
        
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginForm
                  onLogin={handleLogin}
                  onSignup={handleSignup}
                  loading={loading}
                />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;