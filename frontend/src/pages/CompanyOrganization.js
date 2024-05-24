import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";


const CompanyOrganization = () => {
  // 회사 조직도 데이터
  const navigate = useNavigate();

  const [companyStructure, setCompanyStructure] = useState([
    {
      name: '대표이사',
      children: [
        {
          name: '경영지원 본부',
          children: [
            { name: '행정팀', visible: false },
            { name: '인사팀', visible: false }
          ]
        },
        {
          name: '시스템사업 본부',
          children: [
            { name: '시스템영업1팀', visible: false },
            { name: '시스템영업2팀', visible: false },
            { name: '공공영업1팀', visible: false },
            { name: '공공영업2팀', visible: false },
            { name: '기술지원팀', visible: false }
          ]
        },
        {
          name: '개발사업본부',
          children: [
            { name: '보안개발팀', visible: false },
            { name: 'SW개발1팀', visible: false },
            { name: 'SW개발2팀', visible: false }
          ]
        },
        {
          name: 'SM사업본부',
          children: [
            { name: '사업기획팀', visible: false },
            { name: 'SM영업팀', visible: false },
            { name: '서비스센터팀', visible: false }
          ]
        }
      ]
    }
  ]);

  
  const [searchTerm, setSearchTerm] = useState('');

  // const handleDirectorClick = () => {
  //   navigate("/director");
  // };

  // const handleDepartmentClick = (event) => {
  //   event.stopPropagation(); 
  //   navigate("/division");
  // };

  const handleDepartmentClick = (name) => {
    navigate(`/${name.toLowerCase().replace(/\s/g, '-')}`);
  };

  const toggleTeamList = (index) => {
    const updatedCompanyStructure = [...companyStructure];
    updatedCompanyStructure[0].children[index].children.forEach(team => {
      team.visible = !team.visible;
    });
    setCompanyStructure(updatedCompanyStructure);
  };

  const renderDepartment = (department, index) => (
    <div className="department" key={department.name}>
      <div className='department-header'>
        <h3 onClick={() => toggleTeamList(index)}>
          <span className="arrow-icon">{department.children.some(team => team.visible) ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
        </h3>
        <h3 onClick={() => handleDepartmentClick(department.name)} className="department-name">{department.name}</h3>
      </div>
      <ul style={{ display: department.children.some(team => team.visible) ? 'block' : 'none' }}>
        {department.children.map((child, teamIndex) => (
          <li key={teamIndex} style={{ display: child.visible ? 'block' : 'none' }} onClick={() => handleDepartmentClick(child.name)} className="team-name">{child.name}</li>
        ))}
      </ul>
    </div>
  );  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterDepartmentsAndTeams = (departments, searchTerm) => {
    const filtered = departments.reduce((acc, department) => {
      const lowerCaseName = department.name.toLowerCase();
      const isMatched = lowerCaseName.includes(searchTerm.toLowerCase());
  
      if (isMatched) {
        acc.push(department);
      } else if (department.children) {
        const filteredTeams = department.children.filter(team =>
          team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        if (filteredTeams.length > 0) {
          acc.push({ ...department, children: filteredTeams });
        }
      }
  
      return acc;
    }, []);
  
    return filtered;
  };
  
  const filteredDepartments = searchTerm.trim() === '' ?
    companyStructure[0].children :
    filterDepartmentsAndTeams(companyStructure[0].children, searchTerm);
  


  return (
  <div className='search'>  
    <div className="company-organization">
      <div className="search-container">
        <MdOutlineManageSearch />
        <input 
          className="search-input"
          type="text" 
          placeholder="부서를 입력하세요." 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
      </div>
      <div className="ceo">
        <h3 className="ceo-header">
        <IoIosArrowDown />
        {companyStructure[0].name}
        </h3>
      <div className="departments">
      {filteredDepartments.map((department, index) => (
      renderDepartment(department, index)
    ))}
  </div>
</div>
    </div>

  </div>
  );
};

export default CompanyOrganization;