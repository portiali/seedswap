import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './images/seed.png';
import './App.css';
import Login from './Login';

function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  //const [loggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Welcome to SeedSwap!</p>

      <nav>
          <button onClick={() => setShowLogin(true)}>Log In</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
      </nav>

      {showLogin && (
        <Login
          onLogin={() => setIsLoggedIn(true)}
          onClose={() => setShowLogin(false)}
        />
      )}
    </header>
  );
}

export default HomePage;
