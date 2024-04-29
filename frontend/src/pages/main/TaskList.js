import React, { useState } from 'react';
import TaskForm from './TaskForm'; // 업무 작성을 위한 미니페이지 컴포넌트

const TaskList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(1); // taskId 상태 추가 및 초기값 설정

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

  return (
    <div className="task-list" style={{ height: '400px' }}>
      <div className="button-container">
        <button className="add-button" onClick={openForm}>추가</button>
        <button className="delete-button" onClick={handleDeleteTask}>삭제</button>
        <button className="request-button">결재요청</button>
      </div>
      {isFormOpen && (
        <div className="mini-page">
          <TaskForm onTaskSubmit={handleTaskSubmit} onClose={closeForm} />
        </div>
      )}
      {tasks.map((task, index) => (
        <div key={task.id} className="task-item">
        <div className="task-info">
          <p>{index + 1}. {task.title} {task.status} {task.startDate} ~ {task.endDate}</p>
          <div className="checkbox-container">
            <input type="checkbox" />
          </div>
        </div>
      </div>
      
      ))}
    </div>
  );
} 


export default TaskList;

