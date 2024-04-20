import React, { useState } from 'react';

const TaskForm = ({ onClose, onTaskSubmit, taskId }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('예정');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: taskId, // TaskList에서 전달된 taskId 사용
      title: taskTitle,
      description: taskDescription,
      assignee: assignee,
      status: status,
      startDate: startDate,
      endDate: endDate
    };
    onTaskSubmit(newTask); // 새로운 업무 정보를 전달합니다.
    onClose(); // 미니페이지를 닫습니다.
  };

  return (
    <div className="task-form">
      <h2>업무 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            value={taskTitle}
            onChange={handleTitleChange}
            required
          />
        </label>
        <label>
          설명:
          <textarea
            value={taskDescription}
            onChange={handleDescriptionChange}
            required
          />
        </label>
        <label>
          담당자:
          <input
            type="text"
            value={assignee}
            onChange={handleAssigneeChange}
          />
        </label>
        <label>
          상태:
          <select value={status} onChange={handleStatusChange}>
            <option value="예정">예정</option>
            <option value="완료">완료</option>
            <option value="회의">회의</option>
          </select>
        </label>
        <label>
          시작일:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </label>
        <label>
          종료일:
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </label>
        <button type="submit">저장</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};

export default TaskForm;
