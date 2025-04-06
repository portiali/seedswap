import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateAvatar from './pages/CreateAvatar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ChatRoom from './pages/ChatRoom';
import SocialPage from './pages/SocialPage'; 
import { SeedProvider } from "./pages/SeedContext";

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
    <SeedProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path="/login" element={<Login onLogin={handleLogin}/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-avatar" element={<CreateAvatar />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/social" element={<SocialPage />} />
          </Routes>
        </div>
      </Router>
    </SeedProvider>
  );
}

export default App;
