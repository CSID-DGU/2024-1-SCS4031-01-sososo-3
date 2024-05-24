import React, { useState } from 'react';
import TaskForm from './TaskForm'; // 업무 작성을 위한 미니페이지 컴포넌트
import '../../App.css';
import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { FaRegSquareCheck } from "react-icons/fa6";
import { MdOutlineAutoFixNormal } from "react-icons/md";

const TaskList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(1); //

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleTaskSubmit = (newTask) => {
    setTasks([newTask, ...tasks]);
    // 폼 닫기
    closeForm();
  };

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
            <div className='letter'>업무명</div>
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

    {isFormOpen && (
        <div className="mini-page">
          <TaskForm onTaskSubmit={handleTaskSubmit} onClose={closeForm} />
        </div>
      )}
    </div>

    
  );
};

export default TaskList;
