import React, { useState } from "react";
import Garden from "./pages/profile/Garden";
import SeedBank from "./pages/profile/SeedBank";
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css'; 

function ProfilePage() {
    const username = ["Maria"];
    const navigate = useNavigate();

    return(
        <div className="home-page">
            <header className="header">
                <p className="username">{username}</p>
            </header>
            <div className="components-container">
                <Garden />
                <SeedBank />
            </div>
        </div>
    );
}

export default ProfilePage;