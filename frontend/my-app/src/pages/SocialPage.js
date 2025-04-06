import React from 'react';
import SeedPostings from './socials/SeedPostings';
import AccountListings from './socials/AccountListings';
import { useNavigate } from 'react-router-dom';
import './styles/SocialPage.css'; // CSS file for styling

function SocialPage() {
  const navigate = useNavigate(); 
  return (
    <div className="home-page">
      <header className="social-header">
        <h1>Marketplace</h1>
      </header>
      
      <div className="back-btn-container">
        <button onClick={() => navigate('/profile')} className="back-btn">
          Back
        </button>
      </div>
      
      <div className="socialpage-container">
        <div className="socialpage-section">
          <h2 className='socialpage-header'>Seed Postings</h2>
          <SeedPostings />  {/* Use the SeedPostings component here */}
        </div>
        <div className="socialpage-section">
          <h2 className='socialpage-header'>Nearby Users</h2>
          <AccountListings />
        </div>
      </div>
    </div>
    
  );
}

export default SocialPage;