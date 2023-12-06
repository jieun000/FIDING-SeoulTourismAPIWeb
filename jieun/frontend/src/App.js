import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup1 from './components/Signup1';
import Main from './components/Main';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;


