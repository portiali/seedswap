import React, { useState } from "react";
import b from "./book.png";
import "./seedbank.css";

function SeedBank() {
    const [showSeeds, setShowSeeds] = useState(false);
    const [selectedSeeds, setSelectedSeeds] = useState({});
    const seeds = ["Sunflower", "Tomato", "Basil", "Lettuce", "Carrot"];

    const toggleSeeds = () => {
        setShowSeeds(!showSeeds);
      };
    
    const handleCheckboxChange = (seedName) => {
        setSelectedSeeds((prev) => ({
        ...prev,
        [seedName]: !prev[seedName],
        }));
    };

    return (
    <div className="seed-bank">
      <header className="seed-bank-header">
        <p className="title">Seed Bank</p>
        <div className="book-container">
          <img
            src={b}
            className="book"
            alt="book"
            onClick={toggleSeeds}
          />
          {showSeeds && ( //if show seeds is true
            <div className="seed-list-box">
              <ul className="seed-list">
                {seeds.map((seed) => (
                  <li key={seed} className="seed-item">
                    <span>{seed}</span>
                    <input
                      type="checkbox"
                      checked={selectedSeeds[seed] || false}
                      onChange={() => handleCheckboxChange(seed)}
                    />
                  </li>
                ))}
              </ul>
              <div className="action-buttons">
                <button className="plant-btn">Plant</button>
                <button className="trade-btn">Trade</button>
                <button className="add-btn">Add</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default SeedBank;