import React, { useState, useEffect } from 'react';
import Chatbot from './Chatbot';

const Main = () => {
  // 데이터를 저장하는 상태
  const [data, setData] = useState(null);
  // 로딩 상태를 추적하는 상태
  const [isLoading, setIsLoading] = useState(true);
  // 오류를 추적하는 상태
  const [error, setError] = useState(null);

  // 컴포넌트가 마운트될 때 데이터를 가져오기 위한 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터를 가져오는 동안 로딩 상태를 true로 설정
        setIsLoading(true);
        // API 엔드포인트에서 데이터를 가져옵니다 (실제 API 엔드포인트로 교체)
        const response = await fetch('http://localhost:8080/');
        console.log(response);
        const result = await response.json();
        // 상태에 데이터를 설정
        console.log(result);
        setData(result);
      } catch (error) {
        // 오류가 발생하면 오류 상태를 설정
        setError(error);
      } finally {
        // 성공 또는 실패에 관계없이 로딩 상태를 false로 설정
        setIsLoading(false);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []); // 빈 종속성 배열은 이 효과가 컴포넌트가 마운트될 때 한 번만 실행됨을 의미

  // 데이터를 아직 가져오고 있는 경우 로딩 상태를 렌더링
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // 오류가 발생한 경우 오류 상태를 렌더링
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // 실제로 렌더링될 컴포넌트 내용 및 가져온 데이터를 렌더링
  return (
    <>
    <div>
      <h1>데이터가 성공적으로 가져와졌습니다!</h1>
      {/* 여기에 데이터를 렌더링하세요 */}
      <pre>{data.result}</pre>
    </div>
    <div>
      {/* ChatBot 컴포넌트 추가 */}
      <Chatbot />
      </div>
      </>
  );
};

export default Main;
