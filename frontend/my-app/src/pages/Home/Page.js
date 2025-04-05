import React, { useState } from "react";
import Garden from "./Garden";
import SeedBank from "./SeedBank";

function HomePage() {
    const username = ["Maria"];
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

export default HomePage;
