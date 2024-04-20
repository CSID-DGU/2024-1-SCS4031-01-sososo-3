// App.js

import React from 'react';
import './App.css';
import EmployeeHeader from './pages/EmployeeHeader';
import Approval from './pages/Approval';
import TaskList from './pages/TaskList'
import DateComponent from './pages/DateComponent'

const App = () => {
  return (
    <div className="app">
      <EmployeeHeader />
      <div className="rounded-rectangles-container">
        <div className="rounded-rectangle-wrapper">
          <Approval />
        </div>
        <div className="rounded-rectangle-wrapper">
          <DateComponent />
        </div>
      </div>
      <div className="task-list-container">
        <TaskList />
      </div>
    </div>
  );
}

export default App;


