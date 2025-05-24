import React from 'react';
import { Users, MessageCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Header = ({ auth, onTabChange, activeTab }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout', {});
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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

      <div className="tab-navigation">
        <button
          onClick={() => onTabChange('detect')}
          className={`tab-button ${activeTab === 'detect' ? 'active' : ''}`}
        >
          <Camera size={20} />
          <span>Detect Disease</span>
        </button>
        <button
          onClick={() => onTabChange('chat')}
          className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
        >
          <MessageCircle size={20} />
          <span>Chat with AI</span>
        </button>
        <button
          onClick={() => navigate('/community')}
          className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Community</span>
        </button>
      </div>
    </header>
  );
};

export default Header;