import Webcam from "react-webcam";
import '../css/webcam.css'
import { useCallback,useRef, useState } from "react"; // import useState

const CustomWebcam = ({setCropImage,detectDisease,setDiseaseArr}) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null); // initialize it
  const [state,setState]=useState('capture');
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    //console.log(imageSrc)
    setState('photo');
  }, [webcamRef]);
  const detect=()=>{
    setCropImage(imgSrc);

    detectDisease(imgSrc);
    console.log('calling from webcam')
  };
  const retake = () => {
    setImgSrc(null);
    setDiseaseArr([])
    
  };
  return (
    <div >
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <div>
            <button className="retake" onClick={retake}>Retake photo</button>
            <button className="detect" onClick={detect}>Detect Disease</button>
          </div>
          
          
        ) : (
          <button className="capture" onClick={capture}>Capture Photo</button>
        )}
      </div>
    </div>
       // rest of the code
  );
};
export default CustomWebcam;