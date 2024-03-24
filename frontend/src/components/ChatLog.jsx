import React from 'react';

function ChatLog({ messages }) {
  return (
    <div className="log-window mt-3">
      {messages.map((message, index) => (
        <p key={index} className={`chat-text-${message.sender}`}>
          <span>{message.text}</span>
        </p>
      ))}
    </div>
  );
}

export default ChatLog;