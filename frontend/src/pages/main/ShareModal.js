import React, { useState } from 'react';
import '../../App.css';

const ShareModal = ({ onClose, onShare, selectedTasks }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const users = ['User1', 'User2', 'User3']; // 사용자 목록

  const handleUserChange = (user) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(user)
        ? prevSelected.filter(u => u !== user)
        : [...prevSelected, user]
    );
  };

  const handleShare = () => {
    onShare(selectedUsers, selectedTasks);
    onClose();
  };

  return (
    <div className="share-modal">
      <h2>누구에게 공유하시겠습니까?</h2>
      <div className="user-list">
        {users.map(user => (
          <div key={user}>
            <input
              type="checkbox"
              checked={selectedUsers.includes(user)}
              onChange={() => handleUserChange(user)}
            />
            {user}
          </div>
        ))}
      </div>
      <button onClick={handleShare}>공유</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
};

export default ShareModal;
