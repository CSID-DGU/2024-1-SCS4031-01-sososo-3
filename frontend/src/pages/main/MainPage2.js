// MainPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import EmployeeHeader from './EmployeeHeader';
import TaskList2 from './TaskList2';
import DateComponent from './DateComponent';

const MainPage2 = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { roomId } = useParams();
  return (
    <div>
      <EmployeeHeader />
      <DateComponent onDateChange={setSelectedDate} />
      <TaskList2 selectedDate={selectedDate} roomId={roomId} />
    </div>
  );
}

export default MainPage2;
