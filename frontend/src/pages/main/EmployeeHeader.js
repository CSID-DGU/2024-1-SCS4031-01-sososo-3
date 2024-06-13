import React, { useState, useEffect } from 'react';
import { TfiMenu } from "react-icons/tfi";
import { SlOrganization } from "react-icons/sl";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import CompanyOrganization from '../CompanyOrganization';
import '../../App.css';

export const EmployeeHeader = () => {
  const [showOrganization, setShowOrganization] = useState(false); // 조직검색
  const [showMyinforSlide, setShowMyinforSlide] = useState(false); // 내정보 슬라이드
  const [userName, setUserName] = useState('');
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // 로컬 스토리지에서 로그인한 유저 정보 가져오기
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser && loggedInUser.name && loggedInUser.groupCode) {
          setUserName(loggedInUser.name);

          // 그룹 데이터 가져오기
          const response = await fetch(`http://localhost:3001/api/groupsget`);
          if (!response.ok) {
            throw new Error('Failed to fetch group data');
          }
          const data = await response.json();

          // 현재 팀 데이터 찾기
          const currentTeam = data.find(group => group.groupCode === loggedInUser.groupCode);
          if (currentTeam) {
            setGroupName(currentTeam.groupName);
          } else {
            throw new Error('Group not found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchTeamData();
  }, []);

  const handleMyinfor = () => {
    setShowMyinforSlide(!showMyinforSlide); 
  }

  const handleOranization = () => {
    setShowOrganization(!showOrganization);
  }

  const handleLogout = () => {
    // 로그아웃 상태로 변경하고 로컬 스토리지에서 로그인 정보 삭제
    localStorage.removeItem("loggedInUser");
    // 다른 로그아웃 관련 상태를 초기화하는 코드 추가할 수 있음
    // 예: setShowMyinforSlide(false);
    // 예: setShowOrganization(false);
    // 그 후 로그인 페이지로 이동
    window.location.href = "/login";
  }


  return (
    <div className="employee-header">
      <div>
        <button className="myinfor-button" onClick={handleMyinfor}>
          <TfiMenu/> {/* 내정보 확인하기 */}
        </button>
        <span className="website-name">SOSOSO</span> 
      </div>

      <div className="employee-header">
        <button className="myinfor-button" onClick={handleOranization}>
          <SlOrganization /> {/* 조직 검색 */}
        </button>
        <span className="orgsearch-button">조직 검색</span> 
      </div>

      {/* 내정보 슬라이드 */}
      <div className={`slide-panel ${showMyinforSlide ? 'open' : ''}`}>
        <div>
          <div className='myinfor-header'>
          <button className="exit-button2" onClick={() => setShowMyinforSlide(false)}>
            <TfiMenu/>
          </button>
          <span className="website-name2">SOSOSO</span> 
          </div>   
        </div>

        <div>
          <div className="profile-content">
            <CgProfile className="profile-icon" />
            <div className="profile-text">
              <p className="profile-name">{groupName}</p>
              <p className="profile-name">{userName}</p>
            </div>
          </div>
        </div>

        <div className="shortcut">
        <button className="infor-letter" >MyOffice</button>
        <button className="infor-letter">MyTeam</button>
        <button className="infor-letter" onClick={handleLogout}>LogOut</button> {/* 로그아웃 버튼 추가 */}
        </div>
      </div>

      {/* 조직도 슬라이드 */}
      <div className={`slide-panel2 ${showOrganization ? 'open' : ''}`}>
        <div>
          <div className='org-header'>
          <button className="exit-button2" onClick={handleOranization}>
          <IoCloseCircleSharp /> {/* 조직 검색 */}
          </button>
          </div>
        <CompanyOrganization/>{/* 조직도 콘텐츠 */}
        </div>
      </div>
      

    </div>
  );
}

export default EmployeeHeader;