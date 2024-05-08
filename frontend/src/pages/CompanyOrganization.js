import React from 'react';
import { useNavigate } from 'react-router-dom';



const CompanyOrganization = () => {
  // 회사 조직도 데이터
  const navigate = useNavigate();

  const companyStructure = {
    CEO: {
      name: '대표이사',
      departments: {
        '경영지원본부': {
          name: '경영지원본부장',
          teams: ['행정팀', '인사팀', '총무팀']
        },
        '시스템사업본부': {
          name: '시스템사업본부장',
          teams: ['시스템영업1팀', '시스템영업2팀', '공공영업1팀', '공공영업2팀', '기술지원팀']
        },
        '개발사업본부': {
          name: '개발사업본부장',
          teams: ['보안개발팀', 'SW개발1팀','SW개발2팀']
        },
        'SM사업본부': {
          name: 'SM사업본부장',
          teams: ['사업기획팀', 'SM영업팀', '서비스센터팀']
        }
      }
    }
  };

  const handleDirectorClick = () => {
    navigate("/director");
  };

  const handleDepartmentClick = (event) => {
    event.stopPropagation(); // 이벤트 전파 중지
    navigate("/division");
  };

  // 조직도 컴포넌트 생성 함수
  const renderDepartment = (department) => (
    <div className="department" key={department}>
      <h3 onClick={handleDepartmentClick}>{department}</h3>
      <p>{/*companyStructure.CEO.departments[department].name*/}</p>
      <ul>
        {companyStructure.CEO.departments[department].teams.map((team) => (
          <li key={team}>{team}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="company-organization">
      <h2>조직도</h2>
      <div className="ceo" onClick={handleDirectorClick}>
        <h3>{companyStructure.CEO.name}</h3>
        <div className="departments">
          {Object.keys(companyStructure.CEO.departments).map((department) => (
            renderDepartment(department)
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyOrganization;
