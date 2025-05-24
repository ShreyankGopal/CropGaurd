import React, { useState } from 'react';
import api from '../../api';

const AIChat = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Our CropGuard Bot is here to help!" },
  ]);

  const sendChatbotQuery = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await api.post("/chatBotQuery", { text: chatInput });
      
      const botMessage = { sender: "bot", text: response.data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error processing request." }]);
    }

    setChatInput("");
  };

  return (
    <div className="chat-section">
      <h2>Chat with AI</h2>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <p key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </p>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            className="message-input"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendChatbotQuery()}
          />
          <button onClick={sendChatbotQuery} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;