import React, { useState } from "react";
import Garden from "./profile/Garden";
import SeedBank from "./profile/SeedBank";
import { useNavigate } from 'react-router-dom';
import PlaceHolder from "../images/cat.png";
import mailbox from "../images/mail.png";
import './styles/ProfilePage.css'; 


function ProfilePage() {
    const username = ["Maria"];
    const navigate = useNavigate();

    const handleChatroomRedirect = () => {
        navigate('/chatroom');
    };

    const handleSocialPageRedirect = () => {
        navigate('/social');
    };

    return(
        <div className="home-page">
            <header className="profile-header">
                <img src={PlaceHolder} alt="Profile" className="profile-image" />
                <p className="username">{username}</p>
            </header>
            <button onClick={handleChatroomRedirect} className="chatroom-button">
                <img src={mailbox} alt="Profile" className="profile-image" />
            </button>
            <button onClick={handleSocialPageRedirect} className="socialpage-button">
                Social Page
            </button>
            <div className="components-container">
                <Garden />
                <SeedBank />
            </div>
        </div>
    );
}

export default ProfilePage;