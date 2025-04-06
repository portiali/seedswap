import React, { useState } from "react";
import b from "../../images/book.png";
import "../styles/SeedBank.css";
import Garden from "./Garden"; // Import the Garden component

function SeedBank() {
  const [selectedSeeds, setSelectedSeeds] = useState({});
  const [seeds, setSeeds] = useState([
    { name: "Sunflower", status: "normal" },
    { name: "Tomato", status: "normal" },
    { name: "Basil", status: "normal" },
    { name: "Lettuce", status: "normal" },
    { name: "Carrot", status: "normal" },
  ]);
  const [newSeedInputVisible, setNewSeedInputVisible] = useState(false);
  const [newSeedName, setNewSeedName] = useState("");
  const [plantedSeeds, setPlantedSeeds] = useState([]);

  const handleCheckboxChange = (seedName) => {
    setSelectedSeeds((prev) => ({
      ...prev,
      [seedName]: !prev[seedName],
    }));
  };

  const handlePlant = () => {
    const newPlanted = seeds.filter(
      (seed) => selectedSeeds[seed.name] && seed.status === "normal"
    ).map(seed => seed.name);  // Only store the name of the seed
  
    setSeeds((prev) => prev.filter((seed) => !selectedSeeds[seed.name]));
    setPlantedSeeds((prev) => [...prev, ...newPlanted]);
    setSelectedSeeds({});
  };
  

  const handleTrade = () => {
    setSeeds((prev) =>
      prev.map((seed) =>
        selectedSeeds[seed.name] ? { ...seed, status: "traded" } : seed
      )
    );
    setSelectedSeeds({});
  };

  const handleDelete = () => {
    setSeeds((prev) => prev.filter((seed) => !selectedSeeds[seed.name]));
    setSelectedSeeds({});
  };

  const handleAdd = () => {
    setNewSeedInputVisible(true);
  };

  const handleAddSeedConfirm = () => {
    if (newSeedName && !seeds.find((s) => s.name === newSeedName)) {
      setSeeds((prev) => [...prev, { name: newSeedName, status: "normal" }]);
    }
    setNewSeedName("");
    setNewSeedInputVisible(false);
  };

  return (
    <div className="profile">
      <div className="seed-bank">
        <header className="seed-bank-header">
          <p className="title">Seed Bank</p>
        </header>
        <div className="book-container">
          <img src={b} className="book" alt="book" />
        </div>
        <div className="seed-list-box">
            <ul className="seed-list">
              {seeds.map((seed) => (
                <li
                  key={seed.name}
                  className={`seed-item ${seed.status === "traded" ? "traded" : ""}`}
                >
                  <span className="seed-name">{seed.name}</span>
                  {seed.status === "traded" && (
                    <button
                      className="keep-btn"
                      onClick={() =>
                        setSeeds((prev) =>
                          prev.map((s) =>
                            s.name === seed.name ? { ...s, status: "normal" } : s
                          )
                        )
                      }
                    >
                      Keep
                    </button>
                  )}
                  <input
                    type="checkbox"
                    checked={selectedSeeds[seed.name] || false}
                    onChange={() => handleCheckboxChange(seed.name)}
                  />
                </li>
              ))}
            </ul>
            {newSeedInputVisible && (
              <div className="new-seed-input">
                <input
                  type="text"
                  placeholder="New seed name"
                  value={newSeedName}
                  onChange={(e) => setNewSeedName(e.target.value)}
                />
                <button className="confirm-btn" onClick={handleAddSeedConfirm}>
                  Confirm
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setNewSeedInputVisible(false);
                    setNewSeedName("");
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
            <div className="action-buttons">
              <button className="plant-btn" onClick={handlePlant}>
                Plant
              </button>
              <button className="trade-btn" onClick={handleTrade}>
                Trade
              </button>
              <button className="add-btn" onClick={handleAdd}>
                Add
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
      </div>

      {/* Render the Garden component */}
      <Garden plantedSeeds={plantedSeeds} />
    </div>
  );
}

export default SeedBank;
