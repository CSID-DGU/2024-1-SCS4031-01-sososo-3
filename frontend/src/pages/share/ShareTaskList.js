import React, { useState, useEffect, useContext } from 'react';
// import TaskForm from './TaskForm';
import '../../App.css';
import { MdDeleteOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineAutoFixNormal } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RoomContext } from "../../RoomContext";

const ShareTaskList = ({selectedDate, groupCode, leaderRoomId}) => {
  const { roomId: userRoomId } = useContext(RoomContext);
  const [tasks, setTasks] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!leaderRoomId) {
        console.error('leaderRoomId is undefined');
        return;
      }
      try {
        console.log(`Fetching tasks for leaderRoomId: ${leaderRoomId}`);
        const response = await fetch(`http://localhost:3001/api/tasks/${leaderRoomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log('받아온 태스크 로그:', data);
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [leaderRoomId]);

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

  const handleDeleteTask = async () => {
    const tasksToDelete = selectedTasks;
    try {
      await Promise.all(tasksToDelete.map(async (taskId) => {
        const response = await fetch(`http://localhost:3001/api/tasksdel/${leaderRoomId}/${taskId}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
      }));
      setTasks(tasks.filter(task => !selectedTasks.includes(task.taskId)));
      setSelectedTasks([]);
    } catch (error) {
      console.error('Failed to delete tasks:', error);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedTasks(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(taskId => taskId !== id)
        : [...prevSelected, id]
    );
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
      case '진행':
        return 'status-meeting';
      case '완료':
        return 'status-completed';
      default:
        return ''; // 기본값
    }
  };

  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.writeDate);
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  const getDestinationRoomId = (leaderRoomId) => {
    if (leaderRoomId >= 'R0080' && leaderRoomId <= 'R0081') {
      return 'R0094';
    } else if (leaderRoomId >= 'R0082' && leaderRoomId <= 'R0086') {
      return 'R0095';
    } else if (leaderRoomId >= 'R0087' && leaderRoomId <= 'R0089') {
      return 'R0096';
    } else if (leaderRoomId >= 'R0090' && leaderRoomId <= 'R0092') {
      return 'R0097';
    } else if (leaderRoomId >= 'R0094' && leaderRoomId <= 'R0097') {
      return 'R0100'; // 대표이사 페이지
    }
    return '';
  };

  const getDestinationRoomName = (roomId) => {
    switch (roomId) {
      case 'R0094':
        return '경영지원본부';
      case 'R0095':
        return '시스템사업본부';
      case 'R0096':
        return '개발사업본부';
      case 'R0097':
        return 'SM사업본부';
      case 'R0100':
        return '대표이사 페이지';
      default:
        return '';
    }
  };

  const handleShareTasks = async () => {
    const tasksToShare = selectedTasks.map(taskId => tasks.find(task => task.taskId === taskId));
    const destinationRoomId = getDestinationRoomId(leaderRoomId);

    if (!destinationRoomId) {
      alert('Cannot determine destination room ID.');
      return;
    }

    const shareEndpoint = `http://localhost:3001/api/share3/${destinationRoomId}`;

    try {
      await Promise.all(tasksToShare.map(async (task) => {
        const response = await fetch(shareEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        });
        if (!response.ok) {
          throw new Error('Failed to share task');
        }
      }));
      setIsShareOpen(false);
      alert('Tasks shared successfully');
    } catch (error) {
      console.error('Failed to share tasks:', error);
      alert('Failed to share tasks');
    }
  };

  const getShareMessage = (leaderRoomId) => {
    const destinationRoomId = getDestinationRoomId(leaderRoomId);
    const destinationRoomName = getDestinationRoomName(destinationRoomId);
    return `${destinationRoomName}로 공유하시겠습니까?`;
  };

  return (
    <div className='share-align'>
    
    <div className='tasklist-container'>
      <div className='tasklist-container2'>
        <div className='letter' >진행현황</div>
        <div className="teamname">
          <IoIosArrowBack/>
          {groupName}
          <IoIosArrowForward/>
        </div>
        {userRoomId === leaderRoomId && (
        <div className="button-container">
          <button className="delete-button" onClick={handleDeleteTask}><MdDeleteOutline/>삭제</button>
          <button className="share-button" onClick={() => setIsShareOpen(true)}><IoShareSocial/>공유</button>
          <button className="notshare-button" onClick={handleDeleteTask}><GiCancel/>공유취소</button>
        </div>
        )}
      </div>
      
      <div className='tasklist2'>

        <div className='progress'>
          <div className='left-content3'>  
            <div className='letter'>업무명</div>
          </div>
          <div className='center-content3'> 
            <div className='letter'>상태</div>
          </div>
          <div className='center-content4'> 
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

        {filteredTasks.map((task, index) => (
        <div key={task.id}>
          <div className="task-info">
            <MdOutlineAutoFixNormal/>
            <div className='letter'>{index + 1}</div>
              <div className='left-content2'><div className='letter'>{task.taskTitle}</div></div>
              <div className={`center-content3-1 ${getStatusColor(task.status)}`}><div className='letter'>{task.status}</div></div>
              <div className='center-content4'><div className='letter'>{formatDate(new Date(task.startDate))} ~ {formatDate(new Date(task.endDate))}</div></div>
              <div className='right-content5'>
                  <div className='letter'>{formatDate(new Date())}</div>
                </div>
                <div className="right-content3">
                  <div className='letter'>{task.taskAuthor}</div>
                </div>
                <div className="right-content4">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.taskId)}
                    onChange={() => handleCheckboxChange(task.taskId)}
                  />
            </div>
          </div>
        </div>
      ))}

      
      </div>
    </div>

    {isShareOpen && (
        <>
          <div className="popup-overlay" />
          <div className="popup">
            <div className="popup-content">
              <p>{getShareMessage(leaderRoomId)}</p>
              <button onClick={handleShareTasks}>예</button>
              <button onClick={() => setIsShareOpen(false)}>아니오</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
};

export default ShareTaskList;
