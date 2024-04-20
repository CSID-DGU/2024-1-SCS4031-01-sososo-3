// EmployeeHeader.js

// EmployeeHeader.js

import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const EmployeeHeader = () => {
  return (
    <div className="employee-header">
      <div className="left-buttons">
        <button className="exit-button">
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

export default EmployeeHeader;

