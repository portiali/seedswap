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
      <div className="SeedBank">
        <header className="App-header">
          <p class="text-lg italic">Seed Bank</p>
          <img src={b} className="book" alt="book" onClick={toggleSeeds}/>
          
        </header>

        {showSeeds && (
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
          </div>
        </div>
      )}
    </div>
  );
}

export default SeedBank;