// src/pages/SeedPostings.js
import React from 'react';
import './../styles/SocialPage.css';

function SeedPostings() {
    const seedPostings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Sample data for seed postings
  
    return (
      <div className="seed-postings">
        <div className="grid-container">
          {seedPostings.map((post, index) => (
            <div key={index} className="seed-posting">
              <p>seed post {post}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default SeedPostings;