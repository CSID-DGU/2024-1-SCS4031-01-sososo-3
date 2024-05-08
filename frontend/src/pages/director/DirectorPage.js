// DirectorPage.js

import React from 'react';
import '../../App.css';
import DirectorHeader from './DirectorHeader';
import Director from './Director'

const DirectorPage = () => {
  return (
    <div className="app">
      <DirectorHeader />
      <div >
      <Director />
      </div>
    </div>
  );
}

export default DirectorPage;