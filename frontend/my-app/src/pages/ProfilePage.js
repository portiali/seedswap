import React, { useState } from "react";
import Garden from "./profile/Garden";
import SeedBank from "./profile/SeedBank";
import { useNavigate } from 'react-router-dom';
import PlaceHolder from "../images/cat.png";
import './styles/ProfilePage.css'; 


function ProfilePage() {
    const username = ["Maria"];
    const navigate = useNavigate();

    const handleChatroomRedirect = () => {
        navigate('/chatroom');
    };

    return(
        <div className="home-page">
            <header className="profile-header">
                <img src={PlaceHolder} alt="Profile" className="profile-image" />
                <p className="username">{username}</p>
            </header>
            <div className="components-container">
                <Garden />
                <SeedBank />
            </div>
            <button onClick={handleChatroomRedirect} className="chatroom-button">
                Go to Chatroom
            </button>
        </div>
    );
}

export default ProfilePage;