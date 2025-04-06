import React from 'react';
import SeedPostings from './SeedPostings';
import AccountListings from './AccountListings';
import './SocialPage.css'; // CSS file for styling

function SocialPage() {
  return (
    <div className="socialpage-container">
      <div className="socialpage-section seed-postings">
        <h2>Seed Postings</h2>
        <SeedPostings />
      </div>
      <div className="socialpage-section account-listings">
        <h2>Nearby Users</h2>
        <AccountListings />
      </div>
    </div>
  );
}

export default SocialPage;