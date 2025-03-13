import Webcam from "react-webcam";
import { useCallback,useRef, useState } from "react"; // import useState

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null); // initialize it
  const [state,setState]=useState('capture');
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setState('photo');
  }, [webcamRef]);
  const retake = () => {
    setImgSrc(null);
  };
  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={600} width={600} ref={webcamRef} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
       // rest of the code
  );
};
export default CustomWebcam;