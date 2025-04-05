import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import Signup from './Signup';
// import Login from './Login';
// import AvatarCustomization from './AvatarCustomization';
// import HomePage from './HomePage';
import Garden from './pages/Home/Garden';
import SeedBank from './pages/Home/SeedBank';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to SeedSwap! 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Garden/>
        <SeedBank/>
      </header>
    </div>
  );
}

export default App;
