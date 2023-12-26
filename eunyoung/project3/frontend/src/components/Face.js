import React, { useEffect, useRef } from 'react';
import axios from 'axios';

function Face() {
  const videoRef = useRef();

  useEffect(() => {
    const loadVideoStream = async () => {
      const videoStream = await axios.get('http://localhost:5000/video');
      const blobStream = new Blob([videoStream.data], { type: 'multipart/x-mixed-replace' });
      const url = URL.createObjectURL(blobStream);
      videoRef.current.src = url;
    };

    loadVideoStream();
  }, []);

  return (
    <div className="App">
      <h1>Live Webcam Stream</h1>
      <img src='http://localhost:5000/video' alt="webcam" />
    </div>
  );
}

export default Face;
