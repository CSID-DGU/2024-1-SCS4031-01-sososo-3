// MainPage.js
import React from 'react';
import '../../App.css';
import EmployeeHeader from './EmployeeHeader';
import TaskList from './TaskList';
import DateComponent from './DateComponent';

const MainPage = () => {

  return (
    <div>
      <EmployeeHeader />
      <DateComponent />
      <TaskList />
    </div>
  );
}

export default MainPage;
