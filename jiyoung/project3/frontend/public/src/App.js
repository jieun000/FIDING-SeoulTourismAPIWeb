import React from 'react'
import { Routes, Route } from 'react-router-dom';
//import Signup from './components/Signup'; // Main 컴포넌트의 실제 경로를 참조해야 합니다.
import Login from './components/Login';
import Signup1 from './components/Signup1';
import Main from './components/Main';

const App = () => {
    return (

      <Routes>
      <Route path="/signup" element={<Signup1 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
    
      );
}

export default App