import { useEffect, useState } from "react";
import carrotImage from "../../images/carrot.png";
import tomatoImage from "../../images/tomato.png";
import cornImage from "../../images/corn.png";
import sunflowerImage from "../../images/sunflower.png";
import cabbageImage from "../../images/cabbage.png";
import '../styles/Garden.css'


function Garden({ plantedSeeds = [] }) {
  const [flowers, setFlowers] = useState([]);

  const seedImageMap = {
    Carrot: carrotImage,
    Tomato: tomatoImage,
    Corn: cornImage,
    Sunflower: sunflowerImage,
    Cabbage: cabbageImage,
  };

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
          <img src={seedImageMap[flower.seedName]} alt={flower.seedName} className="flower-image" />
          <div className="flower-tooltip">{flower.seedName}</div>
        </div>
      ))}
    </div>
  );
}

export default Garden;
