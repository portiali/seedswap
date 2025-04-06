// Login.js
import React from 'react';
import './styles/Login.css'; // for styling the popup
import { useNavigate } from 'react-router-dom';

function Login({ onClose, onLogin }) {

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();  // always logs in
    onClose();  // closes popup
    navigate('/profile');
  };

  // make user and pw required later
  return (
    <div className="login-overlay">
      <div className="login-popup">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" /> 
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
    </div>
  );
}

export default Login;
