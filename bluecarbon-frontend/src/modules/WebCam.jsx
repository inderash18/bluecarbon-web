import React, { useRef, useEffect, useState } from 'react';
import './WebCam.css';

const WebCam = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreamActive, setIsStreamActive] = useState(false);

  const startWebcam = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsStreamActive(true);
        }
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsStreamActive(false);
    }
  };

  useEffect(() => {
    startWebcam();
    // Cleanup function
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="webcam-container">
      <div className="webcam-header">
        <h2>WebCam</h2>
        <div className="webcam-controls">
          {!isStreamActive ? (
            <button onClick={startWebcam} className="webcam-button start">
              <i className="fas fa-play"></i>
              Start Camera
            </button>
          ) : (
            <button onClick={stopWebcam} className="webcam-button stop">
              <i className="fas fa-stop"></i>
              Stop Camera
            </button>
          )}
        </div>
      </div>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className={`webcam-video ${isStreamActive ? 'active' : 'inactive'}`} 
      />
    </div>
  );
};

export default WebCam;