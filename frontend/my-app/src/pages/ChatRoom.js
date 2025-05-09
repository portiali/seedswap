import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';  // Import useUser hook
import './styles/ChatRoom.css';
import close from '../images/close.png';
import { SeedContext } from "./SeedContext";

function ChatRoom() {
  const { selectedUser, setSelectedUser } = useUser();  // Access selected user from context
  const [messages, setMessages] = useState({});
  const [userInput, setUserInput] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [yourSeed, setYourSeed] = useState('');
  const [theirSeed, setTheirSeed] = useState('');
  const { tradedSeeds, removeTradedSeed, addNewSeed } = useContext(SeedContext);
  const navigate = useNavigate();

  const handleSend = (user, text) => {
    if (!text.trim()) return;
    const newMessage = { user: 'You', text, timestamp: new Date() };

    setMessages((prevMessages) => {
      const userMessages = prevMessages[selectedUser] || [];
      return {
        ...prevMessages,
        [selectedUser]: [...userMessages, newMessage]
      };
    });

    setUserInput('');
  };

  const yourSeeds = tradedSeeds;
  const otherUserSeeds = ['Cucumber Packet', 'Lettuce Packet', 'Radish Packet'];

  const handleSwapSubmit = () => {
    alert(`Your "${yourSeed}" has been swapped with ${selectedUser}'s "${theirSeed}"! Check your updated seedbank`);
    removeTradedSeed(yourSeed);
    addNewSeed(theirSeed);
    setShowSwapModal(false);
    setYourSeed('');
    setTheirSeed('');
  };

  return (
    <div className="chatroom">
      <div className="back-btn-container">
        <button onClick={() => navigate('/profile')} className="back-btn">
          Back
        </button>
      </div>

      <div className="content">
        <div className="left-panel">
          <h2 className="title">Chats</h2>
          <ul className="user-list">
            {['PlantLover', 'GardeningGuru', 'FlowerFanatic'].map((userName) => (
              <li
                key={userName}
                className={`user ${selectedUser === userName ? 'selected' : ''}`}
                onClick={() => setSelectedUser(userName)}
              >
                {userName}
              </li>
            ))}
          </ul>
        </div>

        <div className="right-panel">
          {selectedUser ? (
            <div className="chatbox">
              <h1 className="title">Chat with {selectedUser}</h1>
              <div className="messages">
                {(messages[selectedUser] || []).map((msg, index) => (
                  <div key={index} className={`message ${msg.user === 'You' ? 'user1' : 'user2'}`}>
                    <strong>{msg.user}:</strong> {msg.text}
                  </div>
                ))}
              </div>
              <div className="input-area">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={`Message ${selectedUser}...`}
                />
                <button onClick={() => handleSend('You', userInput)}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="placeholder">
              <p>Click on a chat to start messaging.</p>
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <button className="swap-btn" onClick={() => setShowSwapModal(true)}>
          Swap Seeds!
        </button>
      )}

      {showSwapModal && (
        <div className="swap-modal-overlay" onClick={() => setShowSwapModal(false)}>
          <div className="swap-modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={close}
              alt="Close"
              className="close-icon"
              onClick={() => setShowSwapModal(false)}
            />
            <h2>Trade Seeds with {selectedUser}</h2>
            <div className="dropdowns">
              <div className="swap-box">
                <label>Your Seed:</label>
                <select value={yourSeed} onChange={(e) => setYourSeed(e.target.value)}>
                  <option value="">Select</option>
                  {yourSeeds.map((seed, index) => (
                    <option key={index} value={seed}>{seed}</option>
                  ))}
                </select>
                {yourSeeds.length === 0 && (
                  <p className="no-seeds-message">You have no seeds put up for trade.</p>
                )}
              </div>
              <div className="swap-box">
                <label>{selectedUser}'s Seed:</label>
                <select value={theirSeed} onChange={(e) => setTheirSeed(e.target.value)}>
                  <option value="">Select</option>
                  {otherUserSeeds.map((seed, index) => (
                    <option key={index} value={seed}>{seed}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSwapSubmit}
              disabled={!yourSeed || !theirSeed}
              className="confirm-btn"
            >
              Swap Seeds!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
