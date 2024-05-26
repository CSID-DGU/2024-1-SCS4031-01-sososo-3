import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskForm2 from './TaskForm2';
import '../../App.css';
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineAutoFixNormal } from "react-icons/md";

const TaskList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormOpen2, setIsFormOpen2] = useState(false);
  const [tasks, setTasks] = useState([]);
  const roomId = 'R001'; // 기본 roomId 설정

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

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const openForm2 = () => {
    setIsFormOpen2(true);
  };

  const closeForm2 = () => {
    setIsFormOpen2(false);
  };

  const handleTaskSubmit = (newTask) => {
    setTasks([newTask, ...tasks]);
    // 폼 닫기
    closeForm();
  };

  const handleTaskSubmit2 = (newTask) => {
    setTasks([newTask, ...tasks]);
    // 폼 닫기
    closeForm2();
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.taskId !== id); // 선택된 업무를 제외한 업무 배열을 생성합니다.
    setTasks(updatedTasks); // 업무 배열을 업데이트합니다.
  };

  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.taskId === id) {
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
      case '회의':
        return 'status-meeting';
      case '완료':
        return 'status-completed';
      default:
        return ''; // 기본값
    }
  };

  return (
    <div className='tasklist-container'>

      <div className='tasklist-container2'>
        <div className='letter' >진행현황</div>
        <div className="button-container">
          <button className="add-button" onClick={openForm}><IoIosAdd/>추가</button>
          <button className="delete-button" onClick={() => handleDeleteTask()}><MdDeleteOutline/>삭제</button>
          <button className="share-button"><IoShareSocial/>공유</button>
          <button className="notshare-button"><GiCancel/>공유취소</button>
        </div>
      </div>
      
      <div className='tasklist'>

        <div className='progress'>
          <div className='left-content'>  
            <div className='letter'><span>...............</span>업무명</div>
          </div>
          <div className='center-content1'> 
            <div className='letter'>진행상태</div>
          </div>
          <div className='center-content2'> 
            <div className='letter'>기간</div>
          </div>
          <div className='right-content1'> 
            <div className='letter'>작성일</div>
          </div>
          <div className='right-content2'>
            <FaRegSquareCheck/>
          </div>  
        </div>

        {tasks.map((task, index) => (
        <div key={task.id}>
          <div className="task-info">
            <MdOutlineAutoFixNormal onClick={openForm2}/>
            <div className='letter'>{index + 1}</div>
              <div className='left-content'><div className='letter'>{task.taskTitle}</div></div>
              <div className={`center-content1 ${getStatusColor(task.status)}`}><div className='letter'>{task.status}</div></div>
              <div className='center-content2'><div className='letter'>{formatDate2(task.startDate)} ~ {formatDate2(task.endDate)}</div></div>
            <div className='right-content1'>
              <div className='letter'>{formatDate(new Date())}</div>
            </div>
            <div className="right-content2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.taskId)}
              />
            </div>
          </div>
        </div>
      ))}

      
      </div>

    {isFormOpen && (
        <div className="mini-page">
          <TaskForm onTaskSubmit={handleTaskSubmit} onClose={closeForm} />
        </div>
      )}
    {isFormOpen2 && (
        <div className="mini-page">
          <TaskForm2 onTaskSubmit={handleTaskSubmit2} onClose={closeForm2} />
        </div>
      )}
    </div>

    
  );
};

export default TaskList;