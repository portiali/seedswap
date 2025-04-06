import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import logo from './images/seed.png';
import './App.css';

import Signup from './Signup';
import Login from './Login';
import ProfilePage from './ProfilePage';
// import AvatarCustomization from './AvatarCustomization';
import HomePage from './HomePage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // not used...
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login onLogin={handleLogin}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
