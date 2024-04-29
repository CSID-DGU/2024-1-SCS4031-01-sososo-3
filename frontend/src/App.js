// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 나머지 라우팅 설정 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


