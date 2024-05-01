// DivisonPage.js

import React from 'react';
import '../../App.css';
import DivisionHeader from './DivisionHeader';
import Division from './Division'

const DivisionPage = () => {
  return (
    <div className="app">
      <DivisionHeader />
      <div >
      <Division />
      </div>
    </div>
  );
}

export default DivisionPage;