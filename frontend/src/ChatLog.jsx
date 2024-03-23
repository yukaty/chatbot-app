import React from 'react';

function ChatLog({ messages }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
          {msg.text}
        </p>
      ))}
    </div>
  );
}

export default ChatLog;
