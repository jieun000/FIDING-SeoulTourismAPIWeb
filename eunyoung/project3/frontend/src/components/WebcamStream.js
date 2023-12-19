import React, { useEffect, useRef } from 'react';

const WebcamStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchWebcamStream = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/webcam-stream'); // Flask 서버의 경로에 맞게 수정
        const stream = await response.blob();

        if (videoRef.current) {
          const videoElement = videoRef.current;
          videoElement.srcObject = stream; // 수정
          videoElement.play();
        }
      } catch (error) {
        console.error('Error fetching webcam stream:', error);
      }
    };

    fetchWebcamStream();

    return () => {
      // 정리 코드, 필요한 경우 추가
    };
  }, []); // 의존성 배열이 비어 있어 효과가 한 번만 실행됨

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay playsInline muted />
    </div>
  );
};

export default WebcamStream;
