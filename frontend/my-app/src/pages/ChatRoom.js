import React, { useState } from 'react';
import './chatroom.css';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [user1Input, setUser1Input] = useState('');
  const [user2Input, setUser2Input] = useState('');
  const [user2] = "PlantLover";

  const handleSend = (user, text) => {
    if (!text.trim()) return;
    const newMessage = { user, text, timestamp: new Date() };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chatroom">
      <h1 className="title"> Chatroom with {user2}</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.user === 'User1' ? 'user1' : 'user2'}`}
          >
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="input-area">
        <div className="input-box user1-box">
          <input
            type="text"
            value={user1Input}
            onChange={(e) => setUser1Input(e.target.value)}
            placeholder="Start messaging..."
          />
          <button onClick={() => {
            handleSend('User1', user1Input);
            setUser1Input('');
          }}>
            Send
          </button>
        </div>

        <div className="input-box user2-box">
          <input
            type="text"
            value={user2Input}
            onChange={(e) => setUser2Input(e.target.value)}
            placeholder="User2 message..."
          />
          <button onClick={() => {
            handleSend('User2', user2Input);
            setUser2Input('');
          }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
