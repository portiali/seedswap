// src/pages/SeedPostings.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './../styles/SocialPage.css';
import seed1 from "../../images/corn-packet.png";
import seed2 from "../../images/tomato-packet.png";
import seed3 from "../../images/sunflower-packet.png";
import seed4 from "../../images/cabbage-packet.png";
import seed5 from "../../images/carrot-packet.png";
import crate from "../../images/crate.png";

function SeedPostings() {
    const seedPostings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Sample data for seed postings
    const seedImages = [seed1, seed2, seed3, seed4, seed5];

    const navigate = useNavigate(); 
    const [selectedPost, setSelectedPost] = useState(null); // null means no popup

    const handleClick = (post) => {
        setSelectedPost(post);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    // Function to navigate to the chatroom
    const handleMessageClick = (post) => {
      navigate(`/chatroom`); // Navigate to the chatroom of the user
    };

    return (
      <div className="seed-postings">
        <div className="grid-container">
          {seedPostings.map((post, index) => {
            const assignedImage = seedImages[index % seedImages.length]; // Deterministic image based on index
            return (
              <div key={index} className="seed-posting" onClick={() => handleClick({ post, image: assignedImage })}>
                <img src={assignedImage} alt={`Seed ${index}`} className="seed-thumbnail" />
                <p>seed post {post}</p>
              </div>
            );
          })}
        </div>

      {selectedPost !== null && (
        <div className="popup-overlay" onClick={closeModal}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <img src={selectedPost.image} alt="Seed" className="popup-image" />
            <h2>Seed Post {selectedPost.post}</h2>
            <p>This is some placeholder info about seed post {selectedPost.post}.</p>
            <button className="message-btn" onClick={() => handleMessageClick(selectedPost)}>
                            Message User
            </button>
          </div>
        </div>
      )}
    </div>
      );
    }
    
    export default SeedPostings;