import React, { createContext, useState } from "react";

export const SeedContext = createContext();

export const SeedProvider = ({ children }) => {
  const [tradedSeeds, setTradedSeeds] = useState([]);
  const [seeds, setSeeds] = useState([
    { name: "Sunflower", status: "normal" },
    { name: "Tomato", status: "normal" },
    { name: "Basil", status: "normal" },
    { name: "Lettuce", status: "normal" },
    { name: "Carrot", status: "normal" },
  ]);

  const removeTradedSeed = (seedName) => {
    setTradedSeeds((prev) => prev.filter((s) => s !== seedName));
    setSeeds((prev) =>
      prev.filter((s) => s.name !== seedName) // optional: if you want to fully remove it
    );
  };

  const addNewSeed = (seedName) => {
    setSeeds((prev) => [...prev, { name: seedName, status: "normal" }]);
  };

  return (
    <SeedContext.Provider
      value={{
        tradedSeeds,
        setTradedSeeds,
        seeds,
        setSeeds,
        removeTradedSeed,
        addNewSeed,
      }}
    >
      {children}
    </SeedContext.Provider>
  );
};
