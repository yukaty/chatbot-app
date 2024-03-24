import React from 'react';

function ChatLog({ messages }) {
  return (
    <div className="log-window">
      {messages.map((message, index) => (
        <div key={index} className={`chat-text-${message.sender}`}>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatLog;