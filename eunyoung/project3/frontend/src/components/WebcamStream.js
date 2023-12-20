import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

const WebcamStream = () => {
  const webcamRef = useRef(null);
  const videoRef = useRef(null);

  // useEffect(() => {
  //   const fetchWebcamStream = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/api/webcam-stream');
  //       const stream = await response.blob();

  //       if (videoRef.current) {
  //         const videoElement = videoRef.current;
  //         videoElement.srcObject = stream;
  //         videoElement.play();
  //       }
  //     } catch (error) {
  //       console.error('Error fetching webcam stream:', error);
  //     }
  //   };

  //   fetchWebcamStream();
  // }, []);

  const capture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const formData = new FormData();
      formData.append('file', dataURItoBlob(imageSrc), 'captured-image.jpeg');
      const response = await fetch('http://localhost:5000/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log("사진저장 성공",result);

      if (videoRef.current) {
        videoRef.current.src = imageSrc;
      }
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  return (
    <div>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
      />
      <button onClick={capture} style={{color:'white', border:'2px solid pink', background:'pink'}}>사진 저장</button>
      {/* <video ref={videoRef} width="640" height="480" autoPlay playsInline muted /> */}
    </div>
  );
};

export default WebcamStream;
