import { useState } from "react";
import g from "./garden.png";

function Garden() {
  return (
    <div className="Garden">
      <header className="App-header">
        <p class="text-lg italic">Your Garden</p>
        <img src={g} className="garden-image" alt="garden image" />
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default Garden;

