// TeamPage.js

import React from 'react';
import '../../App.css';
import TeamHeader from './TeamHeader';
import Team from '../team/Team';

const TeamPage = () => {
  return (
    <div className="app">
      <TeamHeader />
      <div>
      <Team />
      </div>
    </div>
  );
}

export default TeamPage;