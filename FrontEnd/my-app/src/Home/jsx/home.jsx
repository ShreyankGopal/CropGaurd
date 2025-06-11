import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [diseaseArr, setDiseaseArr] = useState([]);
  const navigate=useNavigate();
  
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
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  const detectDisease = async (cropImg) => {
    if(!cropImg) {
      console.log('No image selected');
      return;
    }
    console.log("image clicked and processing ...")
    const file = dataURLtoFile(cropImg, "cropImage.jpg");
    const form = new FormData();
    form.append("image", file);

    try {
      const response = await api.post('/detectDisease', form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setDiseaseArr(response.data);
      console.log(diseaseArr);
    } catch(error) {
      console.log(error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("file uploaded")
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImg(reader.result);
        detectDisease(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container">
      <Header 
        auth={auth} 
        onTabChange={handleTabChange} 
        activeTab={activeTab}
        setCropImg={setCropImg}
        setDiseaseArr={setDiseaseArr} 
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
            <div>

            
            <CustomWebcam 
              setCropImage={setCropImg}
              detectDisease={detectDisease}
               setDiseaseArr={setDiseaseArr}
            />
            {diseaseArr.length > 0 && (
            <div className='diseaseResult'>
            <h3>Disease Detection Results:</h3>
            <ul>
              {diseaseArr.map((disease, index) => (
                <li key={index}>
                  There is {Math.round(disease[1] * 100) / 100}% chance that your crop has the disease {disease[0]}
                </li>
              ))}
              <button type='button' className='GoToChat' onClick={()=>setActiveTab('chat')}>Ask CropGuard Bot?</button>
              </ul>
              </div>
            )}
            </div>
            
          )}

          {activeTab === 'chat' && <AIChat cropImg={cropImg} diseaseArr={diseaseArr}/>}
        </div>
      </main>
    </div>
  );
};

export default HomePage;