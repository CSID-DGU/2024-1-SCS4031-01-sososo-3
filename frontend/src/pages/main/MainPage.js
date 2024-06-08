// MainPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import EmployeeHeader from './EmployeeHeader';
import TaskList from './TaskList';
import DateComponent from './DateComponent';

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { roomId } = useParams(); // Get the roomId from the URL
  const [groupCode, setGroupCode] = useState(null);

  useEffect(() => {
    // Fetch groupCode based on roomId (assuming an API exists)
    const fetchGroupCode = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/groupcode/${roomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch group code');
        }
        const data = await response.json();
        setGroupCode(data.groupCode); // Assuming the API returns an object with groupCode
      } catch (error) {
        console.error('Failed to fetch group code:', error);
      }
    };

    fetchGroupCode();
  }, [roomId]);
  
  return (
    <div>
      <EmployeeHeader />
      <DateComponent onDateChange={setSelectedDate} groupCode={groupCode} />
      <TaskList selectedDate={selectedDate} roomId={roomId} />
    </div>
  );
}

export default MainPage;
