import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Menu1 from './components/Menu1';
import Chatbot from './components/Chatbot';
import LoginMain from './components/LoginMain'
import Logout from './components/Logout';

const App = () => {
  return (
    <div>
      <Header />
      
      <Routes>
      {/* <Route path="/" element={<Main />} />  */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/logout" element={<Main />} /> */}
        <Route path="/LoginMain" element={<LoginMain />} />
        <Route path='/logout' element={<Logout/>}/>
        {/* <Route component={Menu1} path="/menu1" exact /> */}
      </Routes>
      <Chatbot/>
      <Footer />
    </div>
  );
};

export default App;