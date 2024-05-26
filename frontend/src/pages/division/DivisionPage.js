// DivisonPage.js

import React from 'react';
import '../../App.css';
import DivisionHeader from './DivisionHeader';
import DivisionDateComponent from './DivisionDateComponent';
import Division from './Division'

const DivisionPage = () => {
  return (
    <div>
      <DivisionHeader />
      <div>
        <DivisionDateComponent/>
      </div>
      <div >
      <Division />
      </div>
    </div>
  );
}

export default DivisionPage;