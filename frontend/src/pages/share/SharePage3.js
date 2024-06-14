import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import ShareHeader from './ShareHeader';
import ShareTaskList from './ShareTaskList';
import ShareDate3 from './ShareDate3';

const SharePage3 = () => {
  const { leaderRoomId } = useParams();
  const [groupCode, setGroupCode] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchGroupCode = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/groupsget');
        if (!response.ok) {
          throw new Error('Failed to fetch group data');
        }
        const data = await response.json();
        const group = data.find(group => group.leaderRoomId === leaderRoomId);
        if (group) {
          setGroupCode(group.groupCode);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchGroupCode();
  }, [leaderRoomId]);

  return (
    <div>
      <ShareHeader />
      <ShareDate3 onDateChange={setSelectedDate} groupCode={groupCode}/>
      <ShareTaskList selectedDate={selectedDate} leaderRoomId={leaderRoomId} />
    </div>
  );
}

export default SharePage3;