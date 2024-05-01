// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main/MainPage'; 
import TeamPage from './pages/team/TeamPage'
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />{/* MainPage 라우팅 추가 */}
          <Route path="/team" element={<TeamPage />} /> {/* TeamPage 라우팅 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


