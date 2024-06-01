// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import { RoomProvider } from './RoomContext';
import MainPage from './pages/main/MainPage'; 
import TeamPage from './pages/team/TeamPage';
import DivisionPage from './pages/division/DivisionPage';
import DirectorPage from './pages/director/DirectorPage';
import Login from './pages/Login';
import LoginStatus from './LoginStatus';
import SharePage from './pages/share/SharePage';
import './App.css';


const App = () => {
  return (
    <RoomProvider>
    <Router>
      <div>
      <LoginStatus /> {/* 각 페이지 로드 시 로그인 상태 확인 */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* 기본 경로로 접근 시 login 페이지로 리디렉션 */}
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />} />{/* MainPage 라우팅 추가 */}
          <Route path="/team" element={<TeamPage />} /> {/* TeamPage 라우팅 추가 */}
          <Route path="/division" element={<DivisionPage />} /> {/* DivisionPage 라우팅 추가 */}
          <Route path="/director" element={<DirectorPage />} /> {/* DirectorPage 라우팅 추가 */}
          <Route path="/director/4" element={<DivisionPage />} /> {/* 시스템영업본부 라우팅 추가*/}
          <Route path="/division/2" element={<TeamPage />} /> {/* 시스템영업1팀 라우팅 추가*/}
          <Route path="/team/:id" element={<SharePage />} /> {/* 팀페이지 라우팅 추가*/}
          
        </Routes>

      </div>
    </Router>
    </RoomProvider>
  );
}

export default App;


