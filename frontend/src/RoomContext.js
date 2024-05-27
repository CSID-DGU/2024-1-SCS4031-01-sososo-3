import React, { createContext, useState } from 'react';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [groupCode, setGroupCode] = useState(''); // groupCode 상태 추가
  const [userLevel, setUserLevel] = useState(''); // userLevel 상태 추가

  const updateName = (name) => {
    setName(name);
  };

  const updateGroupCode = (code) => { // 그룹 코드 업데이트 함수 추가
    setGroupCode(code);
  };

  const updateUserLevel = (level) => { // 유저 레벨 업데이트 함수 추가
    setUserLevel(level);
  };

  return (
    <RoomContext.Provider value={{ roomId, setRoomId, name, updateName, groupCode, updateGroupCode, userLevel, updateUserLevel }}>
      {children}
    </RoomContext.Provider>
  );
};
