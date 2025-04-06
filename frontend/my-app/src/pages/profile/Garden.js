import { useEffect, useState } from "react";
import flowerImage from "../../images/flower.png"; // Placeholder for the flower image
import '../styles/Garden.css'

function Garden({ plantedSeeds = [] }) {
  const [flowers, setFlowers] = useState([]);

  const getRandomPosition = () => {
    const x = Math.random() * 90; // Random X position (0% to 90%)
    const y = Math.random() * 90; // Random Y position (0% to 90%)
    return { x, y };
  };

  useEffect(() => {
    const newFlowers = plantedSeeds
      .filter((seedName) => !flowers.some((f) => f.seedName === seedName)) // avoid re-adding duplicates
      .map((seedName) => {
        const { x, y } = getRandomPosition();
        return {
          seedName: seedName,
          x,
          y,
          id: `${seedName}-${Date.now()}-${Math.random()}`,
        };
      });

    if (newFlowers.length > 0) {
      setFlowers((prev) => [...prev, ...newFlowers]);
    }
  }, [plantedSeeds]); // This will run every time plantedSeeds changes

  return (
    <div className="garden-container">
      <header className="garden-header">
        <p className="title">Your Garden</p>
      </header>
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="flower"
          style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
        >
          <img src={flowerImage} alt="Flower" className="flower-image" />
          <div className="flower-tooltip">{flower.seedName}</div>
        </div>
      ))}
    </div>
  );
}

export default Garden;
