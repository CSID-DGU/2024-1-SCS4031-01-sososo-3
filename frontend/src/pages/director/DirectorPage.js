// DirectorPage.js

import React from 'react';
import '../../App.css';
import DirectorHeader from './DirectorHeader';
import DirectorDateComponent from './DirectorDateComponent'
import Director from './Director'

const DirectorPage = () => {
  return (
    <div>
      <DirectorHeader />
      <div >
      <div>
        <DirectorDateComponent/>
      </div>
      <Director />
      </div>
    </div>
  );
}

export default DirectorPage;