import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const DivisionHeader = () => {
  const navigate = useNavigate(); 

  const handleExit = () => {
    navigate('/director'); // 나가기 버튼 클릭 시 '/director' 페이지로 이동
  };

  return (
    <div className="employee-header">
      <div className="left-buttons">
        <button className="exit-button" onClick={handleExit}>
          <FaSignOutAlt /> {/* 나가기 아이콘 */}
        </button>
      </div>
      <div className="center-button">
        <button>조직도 보기</button>
      </div>
      <div className="right-buttons">
        <button>내 정보</button>
        <button>로그아웃</button>
      </div>
    </div>
  );
}

export default DivisionHeader;