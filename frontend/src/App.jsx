import { useState } from "react";
import ChatLog from "./components/ChatLog";
import MessageForm from "./components/MessageForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.css";

function App() {
  // Define a state variable to store the messages
  const [messages, setMessages] = useState([]);

  // Handle sending a message
  const handleSendMessage = (text) => {
    // Send the message to the backend
    fetch("http://localhost:8000/bot_response/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    })
    .then(response => response.json())
    .then(data =>
      // Update the messages state with the new messages
      setMessages([...messages, { text: text, sender: "user" }, { text: data.reply, sender: "bot" }])
    )
    .catch(error => console.error("Error:", error));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 mt-3">
            <h1>AI Chat Bot</h1>
            <ChatLog messages={messages} />
            <MessageForm onSubmit={handleSendMessage} />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
