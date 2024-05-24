import React, { useState, useRef } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CompanyOrganization from '../CompanyOrganization';
import '../../App.css';

export const EmployeeHeader = () => {
  const navigate = useNavigate(); // useNavigate 사용하기
  const [showOrganization, setShowOrganization] = useState(false); // 조직도 보기
  const modalRef = useRef(null); // 모달 레퍼런스

  const handleExit = () => {
    navigate('/team'); // 나가기 버튼 클릭 시 '/team' 페이지로 이동
  };

  const handleModalClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowOrganization(false); // 모달 외부를 클릭하면 모달 닫기
    }
  };

  return (
    <div className="employee-header">
      <div className="left-buttons">
        <button className="exit-button" onClick={handleExit}>
          <FaSignOutAlt /> {/* 나가기 아이콘 */}
        </button>
      </div>
      <div className="center-button">
        <button onClick={() => setShowOrganization(true)}>조직도 보기</button>
      </div>
      <div className="right-buttons">
        <button variant="contained">내 정보</button>
        <button variant="contained">로그아웃</button>
      </div>

      {showOrganization && (
        <div className="modal-background" onClick={handleModalClick}>
          <div className="modal-content" ref={modalRef}>
            <button onClick={() => setShowOrganization(false)}>x</button>
            <CompanyOrganization /> {/* 회사 조직도 */}
          </div>
        </div>
      )}

    </div>
  );
}

export default EmployeeHeader;