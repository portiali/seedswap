import React, { useState, useEffect } from "react";
import SeedBank from "./profile/SeedBank";
import { useNavigate } from 'react-router-dom';
import placeholderImage from "../images/cat.png"; // fallback image
import mailbox from "../images/mail.png";
import './styles/ProfilePage.css';

function ProfilePage() {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState({ name: "", image: placeholderImage });
    const [username, setUsername] = useState("User");

    useEffect(() => {
        // Load avatar from localStorage
        const storedAvatar = localStorage.getItem('myAvatar');
        if (storedAvatar) {
            setAvatar(JSON.parse(storedAvatar));
        }

        // Load username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleChatroomRedirect = () => {
        navigate('/chatroom');
    };

    const handleSocialPageRedirect = () => {
        navigate('/social');
    };

    return (
        <div className="home-page">
            <header className="profile-header">
                <img src={avatar.image || placeholderImage} alt="Profile" className="profile-image" />
                <p className="username">{username}</p>
            </header>

            <div className="social-buttons-container">
                <button onClick={handleSocialPageRedirect} className="socialpage-button">
                    Social Page
                </button>
                <button onClick={handleChatroomRedirect} className="chatroom-button">
                    <img src={mailbox} alt="Chatroom" className="profile-image" />
                </button>
            </div>

            <div className="components-container">
                <SeedBank />
            </div>
        </div>
    );
}

export default ProfilePage;
