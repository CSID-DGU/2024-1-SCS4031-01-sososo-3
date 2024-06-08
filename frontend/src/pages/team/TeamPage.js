// TeamPage.js

import React, { useState, useEffect } from 'react';
import '../../App.css';
import TeamHeader from './TeamHeader';
import TeamDateComponent from './TeamDateComponent';
import Team from '../team/Team';
import { useParams } from 'react-router-dom';

const TeamPage = () => {
  const [parentGroupCode, setParentGroupCode] = useState(null);
  const { groupCode } = useParams();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch group data
        const response = await fetch(`http://localhost:3001/api/groupsget`);
        if (!response.ok) {
          throw new Error('Failed to fetch group data');
        }
        const data = await response.json();

        // Find current team data
        const currentTeam = data.find(group => group.groupCode === groupCode);
        setParentGroupCode(currentTeam?.parentGroupCode || null);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchTeamData();
  }, [groupCode]);
  return (
    <div>
      <TeamHeader />
      <div>
        <TeamDateComponent parentGroupCode={parentGroupCode}/>
      </div>
      <div>
      <Team />
      </div>
    </div>
  );
}

export default TeamPage;
