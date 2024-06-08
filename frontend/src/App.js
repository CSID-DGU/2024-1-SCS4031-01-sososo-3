import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { RoomProvider } from './RoomContext';
import MainPage from './pages/main/MainPage';
import MainPage2 from './pages/main/MainPage2';
import TeamPage from './pages/team/TeamPage';
import DivisionPage from './pages/division/DivisionPage';
import DirectorPage from './pages/director/DirectorPage';
import Login from './pages/Login';
import LoginStatus from './LoginStatus';
import SharePage from './pages/share/SharePage';
import SharePage2 from './pages/share/SharePage2';
import SharePage3 from './pages/share/SharePage3';
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
            <Route path="/:roomId" element={<MainPage />} />{/* MainPage 라우팅 추가 */}
            <Route path="/share1/:leaderRoomId" element={<SharePage />} />{/* Team 공유페이지 라우팅 추가 */}
            <Route path="/share2/:leaderRoomId" element={<SharePage2 />} />{/* Division 공유페이지 라우팅 추가 */}
            <Route path="/share3/:leaderRoomId" element={<SharePage3 />} />{/* Director 공유페이지 라우팅 추가 */}
            <Route path="/team/:groupCode" element={<TeamPage />} /> {/* TeamPage 라우팅 추가 */}
            <Route path="/division" element={<DivisionPage />} /> {/* DivisionPage 라우팅 추가 */}
            <Route path="/director" element={<DirectorPage />} /> {/* DirectorPage 라우팅 추가 */}
            <Route path="/division/:leaderRoomId" element={<DivisionPage />} /> {/* 시스템영업본부 라우팅 추가 */}
            <Route path="/division/2" element={<TeamPage />} /> {/* 시스템영업1팀 라우팅 추가 */}
          </Routes>
        </div>
      </Router>
    </RoomProvider>
  );
}

export default App;
