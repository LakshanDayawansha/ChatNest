import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './component/login';
import Signup from './component/signup';
import ChatHome from './component/chathome';
import './App.css'


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chathome" element={<ChatHome/>}/>
        </Routes>
    </Router>
  );
}

export default App;