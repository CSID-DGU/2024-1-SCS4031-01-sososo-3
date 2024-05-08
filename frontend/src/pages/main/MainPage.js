// MainPage.js

import React from 'react';
import '../../App.css';
import EmployeeHeader from './EmployeeHeader';
import TaskList from './TaskList';
import DateComponent from './DateComponent';

const MainPage = () => {
  return (
    <div className="app">
      <EmployeeHeader />
      <div className="rounded-rectangles-container">
        <DateComponent />
      </div>
      <div className="task-list-container">
        <TaskList />
      </div>
    </div>
  );
}

export default MainPage;
