import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ChatRoom.css';
import close from '../images/close.png';

function ChatRoom() {
  const [users] = useState([
    { id: 1, name: "PlantLover" },
    { id: 2, name: "GardeningGuru" },
    { id: 3, name: "FlowerFanatic" }
  ]);

  const [messages, setMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [yourSeed, setYourSeed] = useState('');
  const [theirSeed, setTheirSeed] = useState('');

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

  // Mock seed data for both users
  const yourSeeds = ['Carrot Packet', 'Tomato Packet', 'Sunflower Packet'];
  const otherUserSeeds = ['Cucumber Packet', 'Lettuce Packet', 'Radish Packet'];

  const handleSwapSubmit = () => {
    alert(`Requested to swap your "${yourSeed}" with ${selectedUser}'s "${theirSeed}".`);
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
            {users.map((user) => (
              <li
                key={user.id}
                className={`user ${selectedUser === user.name ? 'selected' : ''}`}
                onClick={() => setSelectedUser(user.name)}
              >
                {user.name}
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
                  <div key={index} className={`message ${msg.user === 'User1' ? 'user1' : 'user2'}`}>
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
                <button onClick={() => {
                  handleSend('User1', userInput);
                }}>
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

      {/* Swap Seeds button */}
      {selectedUser && (
        <button className="swap-btn" onClick={() => setShowSwapModal(true)}>
          Swap Seeds!
        </button>
      )}

      {/* Modal for swapping seeds */}
      {showSwapModal && (
        <div className="swap-modal-overlay" onClick={() => setShowSwapModal(false)}>
          <div className="swap-modal" onClick={(e) => e.stopPropagation()}>
              <img
              src={close}
              alt="Close"
              className="close-icon"
              onClick={() => setShowSwapModal(false)}
              />
            <h2>Propose a Seed Swap with {selectedUser}</h2>
            <div className="dropdowns">
              <div className="swap-box">
                <label>Your Seed:</label>
                <select value={yourSeed} onChange={(e) => setYourSeed(e.target.value)}>
                  <option value="">Select</option>
                  {yourSeeds.map((seed, index) => (
                    <option key={index} value={seed}>{seed}</option>
                  ))}
                </select>
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
              Send Swap Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
