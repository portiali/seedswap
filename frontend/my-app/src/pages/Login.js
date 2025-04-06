import React, { useState } from 'react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login({ onClose, onLogin }) {
  const [usernameInput, setUsernameInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the username to localStorage
    localStorage.setItem('username', usernameInput);

    onLogin();
    onClose();
    navigate('/profile');
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Username" 
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)} 
          />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Login;
