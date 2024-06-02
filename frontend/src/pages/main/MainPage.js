// MainPage.js
import React, { useState } from 'react';
import '../../App.css';
import EmployeeHeader from './EmployeeHeader';
import TaskList from './TaskList';
import DateComponent from './DateComponent';

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <EmployeeHeader />
      <DateComponent onDateChange={setSelectedDate} />
      <TaskList selectedDate={selectedDate} />
    </div>
  );
}

export default MainPage;
