// TeamPage.js

import React from 'react';
import '../../App.css';
import EmployeeHeader from '../main/EmployeeHeader';
import Team from '../team/Team';

const TeamPage = () => {
  return (
    <div className="app">
      <EmployeeHeader />
      <div>
      <Team />
      </div>
    </div>
  );
}

export default TeamPage;