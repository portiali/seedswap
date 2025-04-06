import React from 'react';

function SeedPostings() {
  return (
    <div className="socialpage-section seed-postings">
      <div className="grid-container">
        <div className="seed-posting">
          <p><strong>Sunflower Seeds</strong> - gdflhgfld</p>
          <button>Message User</button>
        </div>
        <div className="seed-posting">
          <p><strong>Tomato Seeds</strong> - skfjhjkghf</p>
          <button>Message User</button>
        </div>
        {/* Add more seed postings as needed */}
      </div>
    </div>
  );
}

export default SeedPostings;