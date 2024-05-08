import React from 'react';
import '../../App.css';

const DirectorHeader = () => {

  return (
    <div className="employee-header">
      <div className="left-buttons">
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

export default DirectorHeader;