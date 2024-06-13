import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import ShareHeader from './ShareHeader';
import ShareTaskList from './ShareTaskList';
import ShareDate from './ShareDate';

const SharePage = () => {
  const { leaderRoomId } = useParams();
  const [groupCode, setGroupCode] = useState(null);

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
      <ShareDate groupCode={groupCode}/>
      <ShareTaskList groupCode={groupCode} />
    </div>
  );
}

export default SharePage;