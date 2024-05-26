import React, { useState, useEffect, useRef} from 'react';
import { TfiMenu } from "react-icons/tfi";
import { SlOrganization } from "react-icons/sl";
import { IoCloseCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import CompanyOrganization from '../CompanyOrganization';
import '../../App.css';

export const EmployeeHeader = () => {
  const navigate = useNavigate(); // useNavigate 사용하기
  const [showOrganization, setShowOrganization] = useState(false); // 조직검색
  const [showMyinforSlide, setShowMyinforSlide] = useState(false); // 내정보 슬라이드
  const organizationRef = useRef(null);
  const myInforRef = useRef(null);

  const handleMyinfor = () => {
    setShowMyinforSlide(!showMyinforSlide); 
  }

  const handleOranization = () => {
    setShowOrganization(!showOrganization);
  }

  const handleClickOutside = (event) => {
    if (organizationRef.current && !organizationRef.current.contains(event.target)) {
      setShowOrganization(false);
    }
    if (myInforRef.current && !myInforRef.current.contains(event.target)) {
      setShowMyinforSlide(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        <div className="profile">
          <CgProfile/>
          {/*사원정보 db연결 */}
        </div>

        <div className="shortcut">
          <span className="infor-letter">MyOffice</span> 
          <span className="infor-letter">MyTeam</span> 
          <span className="infor-letter">LogOut</span> 
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
