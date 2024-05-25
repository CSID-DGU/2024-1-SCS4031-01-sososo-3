// TeamPage.js

import React from 'react';
import '../../App.css';
import TeamHeader from './TeamHeader';
import TeamDateComponent from './TeamDateComponent';
import Team from '../team/Team';

const TeamPage = () => {
  return (
    <div>
      <TeamHeader />
      <div>
        <TeamDateComponent/>
      </div>
      <div>
      <Team />
      </div>
    </div>
  );
}

export default TeamPage;
