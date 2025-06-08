import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import api from '../../api';
import Header from './Header';
const DiseaseDetection = ({ onCameraOpen, setCropImg }) => {
  
  

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("file uploaded")
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImg(reader.result);
        
      };
      reader.readAsDataURL(file);
    }
  };

  return (
 
    
    <div className="detect-section">
      <h2>Detect Crop Disease</h2>
      <div className="upload-grid">
        <label className="upload-button">
          <input 
            type='file' 
            onChange={(e)=>handleFileUpload(e)}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <span className="button-text">Upload Photo</span>
          <span className="button-subtext">Drag and drop or click to upload</span>
        </label>
        <button 
          className="upload-button" 
          onClick={() => onCameraOpen()}
        >
          <Camera />
          <span className="button-text">Take Photo</span>
          <span className="button-subtext">Use your device's camera</span>
        </button>
      </div>

      
    </div>
    
  );
};

export default DiseaseDetection;