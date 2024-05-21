import React, { useState } from 'react';
import '../../App.css';

const TaskForm = ({ onClose, onTaskSubmit, taskId }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [author, setAuthor] = useState(''); // 작성자 상태 변수 추가
  const [assignee, setAssignee] = useState(''); //담당자 상태 변수
  const [status, setStatus] = useState('예정');
  const [attachment, setAttachment] = useState(null); // 파일 상태 추가
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

  // 파일 선택 시 이벤트 핸들러
  const handleAttachmentChange = (e) => {
    const file = e.target.files[0]; // 선택한 파일 가져오기
   setAttachment(file); // 파일 상태 업데이트
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
      attachment: attachment, // 파일 정보도 전달
      startDate: startDate,
      endDate: endDate
    };
    onTaskSubmit(newTask); // 새로운 업무 정보를 전달합니다.
    onClose(); // 미니페이지를 닫습니다.
  };

  return (
    <div className="task-form">
      <h2>업무 작성</h2>
      <form onSubmit={handleSubmit}>
        
          
          <input
            type="text"
            placeholder="제목을 입력하세요"
            value={taskTitle}
            onChange={handleTitleChange}
            required
          />
          
          <textarea
            type="text"
            placeholder="내용을 입력하세요"
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
            required
          />
        </div>

        <div className="form-group">
          <label>담당자</label>
          <input 
            type="text"
            value={assignee}
            onChange={handleAssigneeChange}
            required
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
          <label>첨부</label>
          <input
            type="file"
            onChange={handleAttachmentChange}
          />
        </div>

        <div className="form-group">
          <label>시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>

        <div className='form-group'>
          <label>종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </div>

        <button type="submit">저장</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};



export default TaskForm;
