import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Menu1 from './components/Menu1';
import Chatbot from './components/Chatbot';
import LoginMain from './components/LoginMain'
import Mypage from './components/Mypage';
import WebcamStream from './components/WebcamStream';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login=(i)=> {
    // console.log('여기기 왜 안바뀌는거야?', i)
   setIsLoggedIn(i)
  }
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={(i)=>setIsLoggedIn(i)} />
      
      <Routes>
        <Route path="/" element={<Main />} exact /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LoginMain" element={<LoginMain login={login} />} />

        <Route path='/mypage' element={<Mypage login={login} />}/>
        <Route component={Menu1} path="/menu1" />
        <Route path="/webcamStream" element={<WebcamStream />} />
      </Routes>
      <Chatbot/>
      <Footer />
    </div>
  );
};

export default App;