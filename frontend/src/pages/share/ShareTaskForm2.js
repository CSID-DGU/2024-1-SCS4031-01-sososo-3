import React, { useState, useEffect } from 'react';
import '../../App.css';

const ShareTaskForm2 = ({ task, onClose, onTaskSubmit, roomId, groupCode }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('예정');
  const [attachment, setAttachment] = useState(null);
  const [existingAttachment, setExistingAttachment] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.taskTitle);
      setTaskDescription(task.taskDescription);
      setAuthor(task.taskAuthor);
      setAssignee(task.taskAssignee);
      setStatus(task.status);
      setExistingAttachment(task.attachment);
      setStartDate(task.startDate ? task.startDate.split('T')[0] : '');
      setEndDate(task.endDate ? task.endDate.split('T')[0] : '');
    }
  }, [task]);

  const handleTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleAssigneeChange = (e) => {
    setAssignee(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('taskTitle', taskTitle);
    formData.append('taskDescription', taskDescription);
    formData.append('taskAuthor', author);
    formData.append('taskAssignee', assignee);
    formData.append('status', status);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('roomId', roomId);
    formData.append('groupCode', groupCode);

    if (attachment) {
      formData.append('attachment', attachment);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${task.taskId}`, {
        method: 'PUT',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        onTaskSubmit(data.task); // 서버에서 반환된 태스크 데이터를 사용
        onClose();
      } else {
        console.error('Failed to update task:', data.error);
        alert('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update task');
    }
  };

  return (
    <div className="task-form">
      <div className='task-title'>공유하기</div>
      <form onSubmit={handleSubmit}>
        <div className='task-text'>
          <input
            type="text"
            placeholder="제목을 입력하세요."
            value={taskTitle}
            onChange={handleTitleChange}
            readOnly
            required
          />
          <textarea
            type="text"
            placeholder="내용을 입력하세요."
            value={taskDescription}
            onChange={handleDescriptionChange}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label>작성자</label>
          <input
            type="text"
            value={author}
            onChange={handleAuthorChange}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label>담당자</label>
          <input
            type="text"
            value={assignee}
            onChange={handleAssigneeChange}
            readOnly
            required
          />
        </div>
        <div className="form-group">
          <label>진행상태</label>
          <select value={status} onChange={handleStatusChange} disabled>
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
            disabled
          />
          {existingAttachment && (
            <div>
              <a href={existingAttachment} download>
                현재 첨부파일 다운로드
              </a>
            </div>
          )}
        </div>
        <div className="form-group">
          <label>시작일</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            readOnly
            required
          />
        </div>
        <div className='form-group'>
          <label>종료일</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            readOnly
            required
          />
        </div>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
};

export default ShareTaskForm2;
