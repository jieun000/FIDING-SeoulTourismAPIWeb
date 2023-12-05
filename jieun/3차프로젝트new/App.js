import React from 'react'
import { Routes, Route } from 'react-router-dom';
//import Signup from './components/Signup'; // Main 컴포넌트의 실제 경로를 참조해야 합니다.
import Main from './components/Main';
import Signup1 from './components/Signup1';
import A from './components/A';

const App = () => {
    return (

      <Routes>
      <Route path="/signup" element={<Signup1 />} />
      <Route path="/" element={<Main />} />
      <Route path="/a" element={<A />} />
    </Routes>
    
      );
}

export default App