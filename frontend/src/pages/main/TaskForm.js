import React, { useState } from 'react';
import '../../App.css';

const TaskForm = ({ onClose, onTaskSubmit, taskId }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [author, setAuthor] = useState(''); // 작성자 상태 변수 추가
  const [assignee, setAssignee] = useState(''); //담당자 상태 변수
  const [status, setStatus] = useState('예정');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value); // 작성자 입력 값 설정
  };


  const handleAssigneeChange = (e) => { 
    setAssignee(e.target.value); //담당자 입력 값 설정
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
      author: author, //작성자 정보 추가
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
        
          <label>제목</label>
          <input
            type="text"
            value={taskTitle}
            onChange={handleTitleChange}
            required
          />

          <label>설명</label>
          <textarea
            value={taskDescription}
            onChange={handleDescriptionChange}
            required
          />
        
        <div className="form-group">
           <label>작성자</label>
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange} //작성자 변경 핸들러 사용
          />
        </div>

        <div className="form-group">
          <label>담당자</label>
          <input 
            type="text"
            value={assignee}
            onChange={handleAssigneeChange}
            />
        </div>

        <div className="form-group">
          <label>상태</label>
          <select value={status} onChange={handleStatusChange}>
            <option value="예정">예정</option>
            <option value="완료">완료</option>
            <option value="회의">회의</option>
          </select>
          </div>

        <div className="form-group">
          <label>시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className='form-group'>
          <label>종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>

        <button type="submit">저장</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};



export default TaskForm;
