// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage'; 
import TeamPage from './pages/team/TeamPage'
import DivisionPage from './pages/division/DivisionPage'
import DirectorPage from './pages/director/DirectorPage'
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />{/* MainPage 라우팅 추가 */}
          <Route path="/team" element={<TeamPage />} /> {/* TeamPage 라우팅 추가 */}
          <Route path="/division" element={<DivisionPage />} /> {/* DivisionPage 라우팅 추가 */}
          <Route path="/director" element={<DirectorPage />} /> {/* DirectorPage 라우팅 추가 */}

          <Route path="/director/3" element={<DivisionPage />} /> {/* 시스템영업본부 라우팅 추가*/}
          <Route path="/division/1" element={<TeamPage />} /> {/* 시스템영업1팀 라우팅 추가*/}
        </Routes>

      </div>
    </Router>
  );
}

export default App;


