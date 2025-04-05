import logo from './pages/Home/seed.png';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
// import AvatarCustomization from './AvatarCustomization';
// import HomePage from './HomePage';
import Garden from './pages/Home/Garden';
import SeedBank from './pages/Home/SeedBank';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Welcome to SeedSwap! 
          </p>
          <nav>
            <Link to="/login">
              <button>Log In</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </nav>

          <Garden/>
          <SeedBank/>
        </header>
      </div>

      <Routes>
        <Route path="/" element={<p>Home Page - Welcome to SeedSwap!</p>} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/seedbank" element={<SeedBank />} />
      </Routes>
    </Router>
  );
}

export default App;
