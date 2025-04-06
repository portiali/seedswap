import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ChatRoom.css';

function ChatRoom() {
  const [users] = useState([
    { id: 1, name: "PlantLover" },
    { id: 2, name: "GardeningGuru" },
    { id: 3, name: "FlowerFanatic" }
  ]);

  const [messages, setMessages] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [userInput, setUserInput] = useState('');

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
                  setUserInput('');
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
    </div>
  );
}

export default ChatRoom;
