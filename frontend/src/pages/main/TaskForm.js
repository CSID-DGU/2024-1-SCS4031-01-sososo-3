import React, { useState } from 'react';
import '../../App.css';

const TaskForm = ({ onClose, onTaskSubmit, roomId }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('예정');
  const [attachment, setAttachment] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      taskTitle,
      taskDescription,
      taskAuthor: author,
      taskAssignee: assignee,
      status,
      attachment,
      startDate: new Date(startDate).toISOString(), // 수정된 부분
      endDate: new Date(endDate).toISOString(), // 수정된 부분
      roomId,
      groupCode: 'G0001' // groupCode를 기본 값으로 설정
    };
    
    try {
      const response = await fetch('http://localhost:3001/api/taskspost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });

      const data = await response.json();
      if (response.ok) {
        onTaskSubmit(data.task); // 서버에서 반환된 태스크 데이터를 사용
        onClose();
      } else {
        console.error('Failed to add task:', data.error);
        alert('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add task');
    }
  };

  return (
    <div className="task-form">
      <div className='task-title'>작성하기</div>
      <form onSubmit={handleSubmit}> 

          <div className='task-text'>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={taskTitle}
            onChange={handleTitleChange}
            required
          />
          <textarea
            type="text"
            placeholder="내용을 입력하세요."
            value={taskDescription}
            onChange={handleDescriptionChange}
            required
          />
          </div>
        
        <div className="form-group">
           <label>작성자</label>
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange} //작성자 변경 핸들러 사용
            required
          />
        </div>

        <div className = "form-group">
          <label>담당자</label>
          <input 
            type="text"
            value={assignee}
            onChange={handleAssigneeChange}
            required
            />
        </div>

        <div className="form-group">
          <label>진행상태</label>
          <select value={status} onChange={handleStatusChange}>
            <option value="예정">예정</option>
            <option value="회의">회의</option>
            <option value="완료">완료</option>
          </select>
          </div>

        <div className="form-group">
          <label>파일첨부</label>
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

        <button type="button" onClick={onClose}>취소</button>
        <button type="submit">저장</button>

      </form>
    </div>
  );
};



export default TaskForm;