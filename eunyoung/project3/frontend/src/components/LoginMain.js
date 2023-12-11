import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './login.css'

const LoginMain = ({f}) => {
  // 데이터를 저장하는 상태
  const [data, setData] = useState(null);
  // 로딩 상태를 추적하는 상태
  const [isLoading, setIsLoading] = useState(true);
  // 오류를 추적하는 상태
  const [error, setError] = useState(null);

  const [sessionData, setSessionData] = useState();

  useEffect(() => {
    // 세션 정보를 가져오기 위한 API 요청
    axios.get('/LoginMain')
      .then(response => {
        // 세션 데이터를 React state에 저장
        console.log("서버로 온 데이터 ",response.data)
        if(response!=null) f(true)
        setSessionData(response.data);
      })
      .catch(error => {
        console.error('세션 정보 가져오기 실패:', error);
      });
  }, []);
    
      return (
        <div>
          {sessionData ? (
           <div> <p>{sessionData.id}</p>
            <p>{sessionData.pw}</p>
            <p>{sessionData.username}</p>
            <p>{sessionData.nickname}</p>
            <p>{sessionData.phone}</p>
            <p>{sessionData.email}</p>
            <p>{sessionData.address1}</p>
            <p>{sessionData.address2}</p>
            <p>{sessionData.workPlace1}</p>
            <p>{sessionData.workPlace2}</p>
            <p>{sessionData.workPlaceYN}</p> </div>
          ) : (
            <p>로딩 중...</p>
          )}
        </div>
       
      );
    }



export default LoginMain;