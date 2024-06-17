import React, { useState, useEffect, useContext } from 'react';
import { RoomContext } from "../../RoomContext";
import TaskForm from './TaskForm';
import TaskForm2 from './TaskForm2';
import '../../App.css';
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineAutoFixNormal } from "react-icons/md";

const TaskList = ({ selectedDate, roomId }) => {
  const { groupCode, roomId: userRoomId } = useContext(RoomContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormOpen2, setIsFormOpen2] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false); // 팝업 상태 추가
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // 선택된 태스크 상태 추가
  const [selectedTasks, setSelectedTasks] = useState([]); // 체크된 태스크 상태 추가
  const [userName, setUserName] = useState('');
  //const roomId = 'R001'; // 기본 roomId 설정

  useEffect(() => { // 페이지 로드 시 태스크 목록을 받아오는 useEffect 추가
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/${roomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        console.log('Fetched tasks:', data); // 받아온 태스크 로그 추가
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [roomId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/usersget`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        const user = users.find(user => user.roomId === roomId);
        if (user) {
          setUserName(user.name);
        } else {
          setUserName(''); // Handle case where user with roomId is not found
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setUserName(''); // Handle error case, reset userName state or show default value
      }
    };

    fetchUserData();
  }, [roomId]);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openForm2 = (task) => {
    setSelectedTask(task); // 선택된 태스크 설정
    setIsFormOpen2(true);
  };

  const closeForm2 = () => {
    setIsFormOpen2(false);
    setSelectedTask(null); // 선택된 태스크 초기화
  };

  const openShare = () => setIsShareOpen(true); // 팝업 열기
  const closeShare = () => setIsShareOpen(false); // 팝업 닫기

  const handleTaskSubmit = (newTask) => {
    setTasks([newTask, ...tasks]);
    // 폼 닫기
    closeForm();
  };

  const handleTaskSubmit2 = (updatedTask) => {
    setTasks(tasks.map(task => task.taskId === updatedTask.taskId ? updatedTask : task));
    closeForm2();
  };

  const handleDeleteTask = async () => {
    const tasksToDelete = selectedTasks;
    try {
      await Promise.all(tasksToDelete.map(async (taskId) => {
        const response = await fetch(`http://localhost:3001/api/tasksdel/${taskId}`, {
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

  const getLeaderRoomId = (roomId) => {
    if (roomId >= 'R0001' && roomId <= 'R0006') {
      return 'R0080';
    } else if (roomId >= 'R0007' && roomId <= 'R0012') {
      return 'R0081';
    } else if (roomId >= 'R0013' && roomId <= 'R0018') {
      return 'R0082';
    } else if (roomId >= 'R0019' && roomId <= 'R0024') {
      return 'R0083';
    } else if (roomId >= 'R0025' && roomId <= 'R0030') {
      return 'R0084';
    } else if (roomId >= 'R0031' && roomId <= 'R0036') {
      return 'R0085';
    } else if (roomId >= 'R0037' && roomId <= 'R0042') {
      return 'R0086';
    } else if (roomId >= 'R0043' && roomId <= 'R0048') {
      return 'R0087';
    } else if (roomId >= 'R0049' && roomId <= 'R0054') {
      return 'R0088';
    } else if (roomId >= 'R0055' && roomId <= 'R0060') {
      return 'R0089';
    } else if (roomId >= 'R0061' && roomId <= 'R0066') {
      return 'R0090';
    } else if (roomId >= 'R0067' && roomId <= 'R0072') {
      return 'R0091';
    } else if (roomId >= 'R0073' && roomId <= 'R0078') {
      return 'R0092';
    }
    return '';
  };

  const handleShareTasks = async () => {
    const tasksToShare = selectedTasks.map(taskId => tasks.find(task => task.taskId === taskId));
    const leaderRoomId = getLeaderRoomId(roomId);

    try {
      await Promise.all(tasksToShare.map(async (task) => {
        const response = await fetch(`http://localhost:3001/api/share1/${leaderRoomId}`, {
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
      closeShare();
      alert('Tasks shared successfully');
    } catch (error) {
      console.error('Failed to share tasks:', error);
      alert('Failed to share tasks');
    }
  };

  const getShareMessage = (roomId) => {
    if (roomId >= 'R0001' && roomId <= 'R0006') {
      return "행정팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0007' && roomId <= 'R0012') {
      return "인사팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0013' && roomId <= 'R0018') {
      return "시스템영업1팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0019' && roomId <= 'R0024') {
      return "시스템영업2팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0025' && roomId <= 'R0030') {
      return "공공영업1팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0031' && roomId <= 'R0036') {
      return "공공영업2팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0037' && roomId <= 'R0042') {
      return "기술지원팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0043' && roomId <= 'R0048') {
      return "보안개발팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0049' && roomId <= 'R0054') {
      return "SW개발1팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0055' && roomId <= 'R0060') {
      return "SW개발2팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0061' && roomId <= 'R0066') {
      return "사업기획팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0067' && roomId <= 'R0072') {
      return "SM영업팀장 페이지로 공유하시겠습니까?";
    } else if (roomId >= 'R0073' && roomId <= 'R0078') {
      return "서비스센터팀장 페이지로 공유하시겠습니까?";
    }
    return "팀장 페이지로 공유하시겠습니까?";
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const formatDate2 = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
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


  return (
    <div className='tasklist-container'>

      <div className='tasklist-container2'>
        <div className='letter' ></div>
        <div className="teamname">
          {/* <IoIosArrowBack/> */}
          {userName}
          {/* <IoIosArrowForward/> */}
        </div>
        {userRoomId === roomId && (
        <div className="button-container">
          <button className="add-button" onClick={openForm}><IoIosAdd/>추가</button>
          <button className="delete-button" onClick={handleDeleteTask}><MdDeleteOutline/>삭제</button>
          <button className="share-button" onClick={openShare}><IoShareSocial/>공유</button>
          <button className="notshare-button"><GiCancel/>공유취소</button>
        </div>
        )}
      </div>
      
      <div className='tasklist'>

        <div className='progress'>
          <div className='left-content1'>  
            <div className='letter'><span></span>업무명</div>
          </div>
          <div className='center-content'> 
            <div className='letter'>상태</div>
          </div>
          <div className='center-content2'> 
            <div className='letter'>기간</div>
          </div>
          {/* <div className='right-content1'> 
            <div className='letter'>작성일</div>
          </div> */}
          <div className='right-content2'>
            <FaRegSquareCheck/>
          </div>  
        </div>

        {filteredTasks.map((task, index) => (
        <div key={task.taskId}>
          <div className="task-info">
            <MdOutlineAutoFixNormal onClick={() => openForm2(task)}/>
            <div className='letter'>{index + 1}</div>
              <div className='left-content'><div className='letter'>{task.taskTitle}</div></div>
              <div className={`center-content1 ${getStatusColor(task.status)}`}><div className='letter'>{task.status}</div></div>
              <div className='center-content2'><div className='letter'>{formatDate2(task.startDate)} ~ {formatDate2(task.endDate)}</div></div>
            {/* <div className='right-content1'> */}
              {/* <div className='letter'>{formatDate(new Date())}</div> */}
            {/* </div> */}
            <div className="right-content2">
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

    {isFormOpen && (
        <div className="mini-page">
          <TaskForm onTaskSubmit={handleTaskSubmit} onClose={closeForm} roomId={roomId} groupCode={groupCode}  />
        </div>
      )}
    {isFormOpen2 && selectedTask && (
        <div className="mini-page">
          <TaskForm2 task={selectedTask} onTaskSubmit={handleTaskSubmit2} onClose={closeForm2} roomId={roomId} groupCode={groupCode} />
        </div>
      )}

      
    {/* 공유 팝업 */}
    {isShareOpen && (
        <>
          <div className="popup-overlay" />
          <div className="popup">
            <div className="popup-content">
              <p>{getShareMessage(roomId)}</p>
              <button onClick={handleShareTasks}>예</button>
              <button onClick={closeShare}>아니오</button>
            </div>
          </div>
        </>
      )}

    </div>

    
  );
};

export default TaskList;
