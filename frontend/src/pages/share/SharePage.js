// MainPage.js
import React from 'react';
import '../../App.css';
import ShareHeader from './ShareHeader';
import ShareTaskList from './ShareTaskList';
import ShareDate from './ShareDate';

const SharePage = () => {

  return (
    <div>
      <ShareHeader />
      <ShareDate />
      <ShareTaskList />
    </div>
  );
}

export default SharePage;