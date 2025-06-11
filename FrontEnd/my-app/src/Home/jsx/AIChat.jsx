import React, { useState, useEffect } from 'react';
import api from '../../api';

const AIChat = ({ cropImg, diseaseArr }) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Our CropGuard Bot is here to help!" },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var input = "";
    if (diseaseArr.length != 0) {
      setLoading(true);
      for (var i = 0; i < diseaseArr.length; i++) {
        input = input + `there is ${Math.round(diseaseArr[i][1] * 100) / 100}% chance that my crop has the disease ${diseaseArr[i][0]}\n`;
      }
      input = input + "give me remedial suggestions and future prevention methods. Also finally after providing these measures tell this line (Feel Free To Check Out the Community forum to get suggestions from experienced farmers)";
      sendChatbotQuery2(input);
    }
  }, []);

  const sendChatbotQuery2 = async (input) => {
    try {
      const response = await api.post("/chatBotQuery", { text: input });
      const botMessage = { sender: "bot", text: response.data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error processing request." }]);
    } finally {
      setLoading(false); // Set loading to false after response
    }
    setChatInput("");
  };

  const sendChatbotQuery = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true); // Optional: Set loading for manual queries too

    try {
      const response = await api.post("/chatBotQuery", { text: chatInput });
      const botMessage = { sender: "bot", text: response.data };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error processing request." }]);
    } finally {
      setLoading(false); // Set loading to false after response
    }

    setChatInput("");
  };

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="message bot loading-message">
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span>Bot is typing...</span>
    </div>
  );

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
          {loading && <LoadingIndicator />}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            className="message-input"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendChatbotQuery()}
            disabled={loading} // Disable input while loading
          />
          <button 
            onClick={sendChatbotQuery} 
            className="send-button"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;