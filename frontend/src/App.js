// App.js

import React from 'react';
import './App.css';
import EmployeeHeader from './pages/EmployeeHeader';
import TaskList from './pages/TaskList'
import DateComponent from './pages/DateComponent'

const App = () => {
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

export default App;


