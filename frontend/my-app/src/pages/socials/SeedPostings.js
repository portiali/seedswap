// src/pages/SeedPostings.js
import React, { useState } from "react";
import './../styles/SocialPage.css';
import seed from "../../images/seed.png";

function SeedPostings() {
    const seedPostings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Sample data for seed postings

    const [selectedPost, setSelectedPost] = useState(null); // null means no popup

    const handleClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="seed-postings">
          <div className="grid-container">
            {seedPostings.map((post, index) => (
              <div key={index} className="seed-posting" onClick={() => handleClick(post)}>
                <p>seed post {post}</p>
              </div>
            ))}
          </div>
    
          {selectedPost !== null && (
            <div className="popup-overlay" onClick={closeModal}>
              <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal}>×</button>
                <img src={seed} alt="Seed" className="popup-image" />
                <h2>Seed Post {selectedPost}</h2>
                <p>This is some placeholder info about seed post {selectedPost}.</p>
                <button className="message-btn">Message User</button>
              </div>
            </div>
          )}
        </div>
      );
    }
    
    export default SeedPostings;