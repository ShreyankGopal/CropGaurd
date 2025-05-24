import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../css/HomePage.css';
import api from '../../api';

import Header from './Header';
import DiseaseDetection from './DiseaseDetection';
import AIChat from './AIChat';
import CustomWebcam from './webcam';  // Assuming this is already created

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('detect');
  const [auth, setAuth] = useState(0);
  const [cropImg, setCropImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/");
        if(response.data === "authenticated"){
          setAuth(1);
        }
      } catch (error) {
        if(error.response?.status === 401){
          setAuth(0);
        }
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <Header 
        auth={auth} 
        onTabChange={handleTabChange} 
        activeTab={activeTab} 
      />

      <main className="main-content">
        <div className="content-area">
          {activeTab === 'detect' && (
            <DiseaseDetection 
              onCameraOpen={() => setActiveTab('CamOpen')}
              setCropImg={setCropImg}
            />
          )}

          {activeTab === 'CamOpen' && (
            <CustomWebcam 
              setCropImage={setCropImg} 
            />
          )}

          {activeTab === 'chat' && <AIChat />}
        </div>
      </main>
    </div>
  );
};

export default HomePage;