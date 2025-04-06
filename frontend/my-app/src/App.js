import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
          <Route path="/create-avatar" element={<CreateAvatar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
