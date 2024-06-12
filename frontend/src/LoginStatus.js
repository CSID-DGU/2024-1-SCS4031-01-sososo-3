// 각 페이지 컴포넌트에서 로그인 상태 확인 및 유지
import React, { useContext, useEffect } from 'react'; // useEffect 추가
import { useNavigate } from 'react-router-dom';
import { RoomContext } from './RoomContext';

const LoginStatus = () => {
  const { setRoomId, updateName, updateGroupCode, updateUserLevel } = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // loggedInUser 가져오기
    if (loggedInUser) {
      setRoomId(loggedInUser.roomId);
      updateName(loggedInUser.name);
      updateGroupCode(loggedInUser.groupCode);
      updateUserLevel(loggedInUser.userLevel);
    } else {
      // 로그인 정보가 없는 경우 로그인 페이지로 리디렉션
      navigate("/login");
    }
  }, []); // 이펙트를 한 번만 실행하도록 빈 배열 전달

  return null;
};

export default LoginStatus;