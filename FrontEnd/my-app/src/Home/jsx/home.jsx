import React, { useState,useEffect } from 'react';
import { Camera, Upload, MessageCircle, Users } from 'lucide-react';
import '../css/HomePage.css';
import CustomWebcam from './webcam';
import { Navigate } from 'react-router-dom';
import api from '../../api';
const HomePage = () => {
  const [activeTab, setActiveTab] = useState('detect');
  const [auth,setAuth]=useState(0);
  
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Our CropGuard Bot is here to help!" },
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/");
        console.log(response.data)
        if(response.data==="authenticated"){
          setAuth(1);
        }
      } catch (error) {
        if(error.response.status===401){
          setAuth(0);
        }
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const handleLogout=async()=>{
    try{
      const response=await api.post('/logout',{})
      console.log(response.data);
      window.location.reload()
    }
    catch(error){
      console.log(error);
    }
    
  }
  const sendChatbotQuery = async () => {
    if (!chatInput.trim()) return; // Prevent sending empty messages

    const userMessage = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, userMessage]); // Add user message

    try {
      const response = await api.post("/chatBotQuery", { text: chatInput });

      const botMessage = { sender: "bot", text: response.data };
      setMessages((prev) => [...prev, botMessage]); // Add bot response
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error processing request." }]);
    }

    setChatInput(""); // Clear input after sending
  };
  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">🌱</div>
            <h1>CropGuard</h1>
          </div>
          
          <div className="auth-buttons">
            {auth === 1 ? (
              <button onClick={handleLogout} className="logout-button">Logout</button>
            ) : (
            <>
              <button onClick={() => window.location.href = '/login'} className="login-button">Login</button>
              <button onClick={() => window.location.href = '/signup'} className="signup-button">Sign Up</button>
            </>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="tab-navigation">
          <button
            onClick={() => setActiveTab('detect')}
            className={`tab-button ${activeTab === 'detect' ? 'active' : ''}`}
          >
            <Camera size={20} />
            <span>Detect Disease</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
          >
            <MessageCircle size={20} />
            <span>Chat with AI</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
          >
            <Users size={20} />
            <span>Community</span>
          </button>
        </div>

        <div className="content-area">
          {activeTab === 'detect' && (
            <div className="detect-section">
              <h2>Detect Crop Disease</h2>
              <div className="upload-grid">
                <button className="upload-button">
                  <input type='file' />
                  <span className="button-text">Upload Photo</span>
                  <span className="button-subtext">Drag and drop or click to upload</span>
                </button>
                <button className="upload-button" onClick={()=>setActiveTab('CamOpen')}>
                  <Camera size={40} />
                  <span className="button-text">Take Photo</span>
                  <span className="button-subtext">Use your device's camera</span>
                </button>
              </div>
              <button className='submit-picture'>Detect Disease</button>
            </div>
          )}
          {activeTab ==='CamOpen' && (
            <CustomWebcam />
          )}
          {activeTab === 'chat' && (
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
                />
                <button onClick={sendChatbotQuery} className="send-button">Send</button>
              </div>
            </div>
            
          </div>
          )}

          {activeTab === 'community' && (
            <div className="community-section">
              <h2>Farmer Community Forum</h2>
              <button className="new-discussion">
                <h3>Start a New Discussion</h3>
                <p>Share your experience or ask questions</p>
              </button>
              <div className="discussions">
                <h3>Recent Discussions</h3>
                <div className="discussion-list">
                  <div className="discussion-item">
                    <p className="discussion-title">Tips for preventing tomato blight</p>
                    <p className="discussion-meta">Posted by John D. • 2 hours ago</p>
                  </div>
                  <div className="discussion-item">
                    <p className="discussion-title">Best practices for organic pest control</p>
                    <p className="discussion-meta">Posted by Sarah M. • 4 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;
