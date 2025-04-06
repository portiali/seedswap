import { useState } from "react";
import g from "../../images/garden.png";
import '../styles/Garden.css'

function Garden() {
  return (
    <div className="Garden">
      <header className="App-header">
        <p class="text-lg italic">Your Garden</p>
        <img src={g} className="garden-image" alt="garden image" />
      </header>
    </div>
  );
}

export default Garden;

