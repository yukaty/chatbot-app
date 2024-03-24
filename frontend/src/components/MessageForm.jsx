import React, { useState } from "react";

function MessageForm({ onSubmit }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputText);
    setInputText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          className="input_text form-control"
          placeholder="Message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit" className="btn btn-success">
          <i className="bi bi-send"></i>
        </button>
      </div>
    </form>
  );
}

export default MessageForm;
