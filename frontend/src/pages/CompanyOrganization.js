import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineManageSearch } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

const CompanyOrganization = () => {
  const navigate = useNavigate();
  const [companyStructure, setCompanyStructure] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const fetchGroupAndTeamData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/groupsget`);
        if (!response.ok) {
          throw new Error('Failed to fetch group data');
        }
        const data = await response.json();
        console.log('받아온 그룹 데이터:', data);
        setGroupData(data);

        const structure = [
          {
            name: '대표이사',
            children: data
              .filter(group => group.groupLevel === '2') // 본부 레벨 필터
              .map(group => ({
                name: group.groupName,
                groupCode: group.groupCode,
                children: data
                  .filter(team => team.groupLevel === '1' && team.parentGroupCode === group.groupCode) // 팀 레벨 필터
                  .map(team => ({ name: team.groupName, groupCode: team.groupCode, visible: false }))
              }))
          }
        ];
        setCompanyStructure(structure);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchGroupAndTeamData();
  }, []);

  const handleDepartmentClick = (groupCode, name) => {
    if (name === '대표이사') {
      navigate('/Director');
    } else {
      navigate(`/division/${groupCode}`);
    }
  };

  const handleTeamClick = (groupCode, name) => {
    navigate(`/team/${groupCode}`);
  };

  const toggleTeamList = (departmentIndex) => {
    const updatedCompanyStructure = [...companyStructure];
    updatedCompanyStructure[0].children[departmentIndex].children.forEach(team => {
      team.visible = !team.visible;
    });
    setCompanyStructure(updatedCompanyStructure);
  };

  const renderDepartment = (department, departmentIndex) => (
    <div className="department" key={department.name}>
      <div className='department-header'>
        <h3 onClick={() => toggleTeamList(departmentIndex)}>
          <span className="arrow-icon">{department.children.some(team => team.visible) ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
        </h3>
        <h3 onClick={() => handleDepartmentClick(department.groupCode, department.name)} className="department-name">{department.name}</h3>
      </div>
      <ul style={{ display: department.children.some(team => team.visible) ? 'block' : 'none' }}>
        {department.children.map((child, teamIndex) => (
          <li key={teamIndex} style={{ display: child.visible ? 'block' : 'none' }} onClick={() => handleTeamClick(child.groupCode, child.name)} className="team-name">{child.name}</li>
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
    companyStructure[0]?.children || [] :
    filterDepartmentsAndTeams(companyStructure[0]?.children || [], searchTerm);

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
            {companyStructure[0]?.name}
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
