import React, { useState } from "react";
import dog from '../../images/cat.png';
import cat from '../../images/dog.png';
import mailbox from "../../images/mail.png";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './../styles/SocialPage.css';

function AccountListings() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

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
      avatar: dog,
      seedBank: ["Lettuce", "Spinach", "Radish"],
    },
    {
      username: "@tomato2eater",
      city: "Naperville, IL",
      avatar: cat,
      seedBank: ["Pineapple", "Spinach", "Radish"],
    },
  ];

  // Function to handle message click and navigate to ChatRoom
  const handleMessageClick = () => {
    navigate(`/chatroom`);  // Navigate to the chatroom of the user
  };

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
          {/* Use button and onClick for message */}
          <button 
            onClick={() => handleMessageClick(user.username)} 
            className="message-icon" 
            title="Message User"
          >
            <img src={mailbox} alt="Message User" className="message-button-img" />
          </button>
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
