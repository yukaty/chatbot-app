import React from 'react';

function ChatLog({ messages }) {
  return (
    <div className="log-window">
      {messages.map((message, index) => (
        // <p key={index} className={`chat-text-${message.sender}`}>
        <p key={index} className={`chat-text-color${message.sender === 'user' ? '1' : '2'}`}>
          <span>{message.text}</span>
        </p>
      ))}
    </div>
  );
}

export default ChatLog;

// <div>
// {messages.map((msg, index) => (
//   <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
//     {msg.text}
//   </p>
// ))}
// </div>