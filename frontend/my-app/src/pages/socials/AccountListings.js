import React, { useState } from "react";
import cat from '../../images/cat.png';
import mailbox from "../../images/mail.png";
import './../styles/SocialPage.css';

function AccountListings() {

  const [selectedUser, setSelectedUser] = useState(null);

  // Function to handle the "View Profile" button click
  const handleViewProfile = (user) => {
    setSelectedUser(user);
  };

  // Function to close the profile popup
  const closeProfile = () => {
    setSelectedUser(null);
  };

  // Sample users with placeholder seed bank data
  const users = [
    {
      username: "@plantlover123",
      city: "Chicago, IL",
      avatar: cat,
      seedBank: ["Tomato", "Cucumber", "Carrot"],
    },
    {
      username: "@greenthumb88",
      city: "Evanston, IL",
      avatar: cat,
      seedBank: ["Lettuce", "Spinach", "Radish"],
    },
  ];

  return (
    <div>
      {users.map((user, index) => (
        <div className="user-box" key={index}>
          <div className="user-info-left">
            <img src={user.avatar} alt="avatar" className="avatar-img" />
          </div>
          <div className="user-info-right">
            <p className="social-username">{user.username}</p>
            <p className="city">{user.city}</p>
            <button onClick={() => handleViewProfile(user)}>View Profile</button>
          </div>
          <a href="/message/username123" className="message-icon" title="Message User">
            <img src={mailbox} alt="Message User" className="message-button-img" /> 
          </a>
        </div>
      ))}

      {/* Popup for viewing profile */}
      {selectedUser && (
        <div className="popup-overlay" onClick={closeProfile}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProfile}>×</button>
            <div className="popup-avatar">
              <img src={selectedUser.avatar} alt="Avatar" className="avatar-img" />
            </div>
            <h2>{selectedUser.username}</h2>
            <p><strong>Location:</strong> {selectedUser.city}</p>
            <p><strong>Seed Bank:</strong></p>
            <ul>
              {selectedUser.seedBank.map((seed, index) => (
                <li key={index}>{seed}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


export default AccountListings;