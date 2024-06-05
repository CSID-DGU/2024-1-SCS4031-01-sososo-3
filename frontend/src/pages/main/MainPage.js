// MainPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import EmployeeHeader from './EmployeeHeader';
import TaskList from './TaskList';
import DateComponent from './DateComponent';

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { roomId } = useParams(); // Get the roomId from the URL
  
  return (
    <div>
      <EmployeeHeader />
      <DateComponent onDateChange={setSelectedDate} />
      <TaskList selectedDate={selectedDate} roomId={roomId} />
    </div>
  );
}

export default MainPage;
