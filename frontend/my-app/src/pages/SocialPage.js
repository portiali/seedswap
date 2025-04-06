import React from 'react';
import SeedPostings from './socials/SeedPostings';
import AccountListings from './socials/AccountListings';
import './styles/SocialPage.css'; // CSS file for styling

function SocialPage() {

  return (
    <div className="home-page">
      <header className="profile-header">
          <h1>Socials</h1>
      </header>
      <div className="socialpage-container">
        <div className="socialpage-section">
          <h2>Seed Postings</h2>
          <SeedPostings />  {/* Use the SeedPostings component here */}
        </div>
        <div className="socialpage-section">
          <h2>Nearby Users</h2>
          <AccountListings />
        </div>
      </div>
    </div>
  );
}

export default SocialPage;