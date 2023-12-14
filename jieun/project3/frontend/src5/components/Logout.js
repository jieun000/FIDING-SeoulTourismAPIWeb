import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {

  const handleLogout = async () => {

    const history = useHistory();

    try {
      // 서버에 세션 무효화 및 로그아웃을 수행하기 위한 요청 전송
      await axios.post('/logout').then(()=>{
        console.log("성공")
      }).catch(()=>{
        console.log("오류")
      }); // '/api/logout'을 실제 로그아웃 엔드포인트로 교체하세요.

      // 로컬 세션 관련 데이터를 지우세요 (필요한 경우)
      
      // 로그아웃 성공 후 적절한 위치로 리다이렉트
      history.push('/'); // 예를 들어 로그인 페이지로 리다이렉트할 수 있습니다.
    } catch (error) {
      console.error('로그아웃 실패', error);
      // 필요한 경우 로그아웃 실패를 처리하세요.
    }
  };

  return (
    <div  onClick={handleLogout}>Logout</div>
  )
}

export default Logout