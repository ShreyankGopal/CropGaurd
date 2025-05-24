import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import api from '../../api';
import Header from './Header';
const DiseaseDetection = ({ onCameraOpen, setCropImg }) => {
  const [diseaseArr, setDiseaseArr] = useState([]);

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
    } catch(error) {
      console.log(error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImg(reader.result);
        detectDisease(reader.result);
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
            onChange={handleFileUpload}
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
          <Camera size={40} />
          <span className="button-text">Take Photo</span>
          <span className="button-subtext">Use your device's camera</span>
        </button>
      </div>

      {diseaseArr.length > 0 && (
        <div className='diseaseResult'>
          <h3>Disease Detection Results:</h3>
          <ul>
            {diseaseArr.map((disease, index) => (
              <li key={index}>
                There is {Math.round(disease[1] * 100) / 100}% chance that your crop has the disease {disease[0]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    
  );
};

export default DiseaseDetection;