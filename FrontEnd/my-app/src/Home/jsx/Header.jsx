import React from 'react';
import { Users, MessageCircle, Camera , CircleUser, BellPlus} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';


const Header = ({ auth, onTabChange, activeTab , setCropImg,setDiseaseArr}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/logout', {});
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDiseaseClickButton=async()=>{
    setCropImg(null);
    setDiseaseArr([]);
    onTabChange('detect')
  }
  const handleChatClick=async()=>{
    setCropImg(null);
    setDiseaseArr([]);
    onTabChange('chat')
  }

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
              <button onClick={() => navigate('/login')} className="login-button">Login</button>
              <button onClick={() => navigate('/signup')} className="signup-button">Sign Up</button>
            </>
          )}
        </div>
      </div>

      <div className="tab-navigation">
        <button
          onClick={() => handleDiseaseClickButton()}
          className={`tab-button ${activeTab === 'detect' ? 'active' : ''}`}
        >
          <Camera size={20} />
          <span>Detect Disease</span>
        </button>
        <button
          onClick={() => handleChatClick()}
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
        <button
          onClick={() => navigate('/profilePage')}
          className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
        >
          <CircleUser size={20} />
          <span>Profile</span>
        </button>
        <button
          onClick={() => navigate('/notification')}
          className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
        >
          <BellPlus size={20} />
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;