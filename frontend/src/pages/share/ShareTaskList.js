import React, { useState, useEffect } from 'react';
// import TaskForm from './TaskForm';
import '../../App.css';
import { MdDeleteOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineAutoFixNormal } from "react-icons/md";

const ShareTaskList = ({groupCode}) => {
  const [tasks, setTasks] = useState([]);
  // const [taskId, setTaskId] = useState(1);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
          // 그룹 데이터 가져오기
          const response = await fetch(`http://localhost:3001/api/groupsget`);
          if (!response.ok) {
            throw new Error('Failed to fetch group data');
          }
          const data = await response.json();
          const currentTeam = data.find(group => group.groupCode === groupCode);
          if (currentTeam) {
            setGroupName(currentTeam.groupName);
          } else {
            throw new Error('Group not found');
          }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchTeamData();
  }, []);

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id); // 선택된 업무를 제외한 업무 배열을 생성합니다.
    setTasks(updatedTasks); // 업무 배열을 업데이트합니다.
  };

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case '예정':
        return 'status-scheduled';
      case '회의':
        return 'status-meeting';
      case '완료':
        return 'status-completed';
      default:
        return ''; // 기본값
    }
  };

  return (
    <div className='share-align'>

    <div className='share-panel'>
        <div className="teamname">
          {groupName}
        </div>
    </div>
    
    <div className='tasklist-container'>
      <div className='tasklist-container2'>
        <div className='letter' >진행현황</div>
        <div className="button-container">
          <button className="delete-button" onClick={() => handleDeleteTask()}><MdDeleteOutline/>삭제</button>
          <button className="share-button"><IoShareSocial/>공유</button>
          <button className="notshare-button"><GiCancel/>공유취소</button>
        </div>
      </div>
      
      <div className='tasklist2'>

        <div className='progress'>
          <div className='left-content'>  
            <div className='letter'>업무명</div>
          </div>
          <div className='center-content1'> 
            <div className='letter'>진행상태</div>
          </div>
          <div className='center-content2'> 
            <div className='letter'>기간</div>
          </div>
          <div className='right-content5'> 
            <div className='letter'>공유일</div>
          </div>
          <div className='right-content3'> 
            <div className='letter'>공유자</div>
          </div>
          <div className='right-content4'>
            <FaRegSquareCheck/>
          </div>  
        </div>

        {tasks.map((task, index) => (
        <div key={task.id}>
          <div className="task-info">
            <MdOutlineAutoFixNormal/>
            <div className='letter'>{index + 1}</div>
              <div className='left-content'><div className='letter'>{task.title}</div></div>
              <div className={`center-content1 ${getStatusColor(task.status)}`}><div className='letter'>{task.status}</div></div>
              <div className='center-content2'><div className='letter'>{task.startDate} ~ {task.endDate}</div></div>
            <div className='right-content1'>
              <div className='letter'>{formatDate(new Date())}</div>
            </div>
            <div className="right-content2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
            </div>
          </div>
        </div>
      ))}

      
      </div>
    </div>

    </div>
  );
};

export default ShareTaskList;
