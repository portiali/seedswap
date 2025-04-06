import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import '../App.css';
import Login from './Login';

function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="home-page">
      <header className="App-header">
        <p className="welcome">Welcome to</p>
        <p className="seedswap">SeedSwap!</p>

        <nav>
          <button className="login-btn" onClick={() => setShowLogin(true)}>LOG IN</button>
          <button className="signup-btn" onClick={() => navigate('/signup')}>SIGN UP</button>
        </nav>

        {showLogin && (
          <Login
            onLogin={() => setIsLoggedIn(true)}
            onClose={() => setShowLogin(false)}
          />
        )}
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default HomePage;
