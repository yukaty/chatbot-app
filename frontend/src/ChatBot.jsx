import React, { useState } from 'react';
import ChatLog from './ChatLog';

function ChatBot() {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const message = form.elements.message.value;

    // add a new message to the messages array
    setMessages([...messages, { text: message, sender: 'user' }]);

    form.reset();
  };

  return (
    <div>
      <h1>AI Chat Bot</h1>
      <ChatLog messages={messages} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" placeholder="Message" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ChatBot;
