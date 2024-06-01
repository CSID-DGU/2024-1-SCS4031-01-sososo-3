// 각 페이지 컴포넌트에서 로그인 상태 확인 및 유지
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoomContext } from './RoomContext';

const LoginStatus = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  const { setRoomId, updateName, updateGroupCode, updateUserLevel } = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setRoomId(user.roomId);
        updateName(user.name);
        updateGroupCode(user.groupCode);
        updateUserLevel(user.userLevel);
        navigate("/main");
    } else {
      // 로그인 정보가 없는 경우 로그인 페이지로 리디렉션
      navigate("/login");
    }
  }, []); // 이펙트를 한 번만 실행하도록 빈 배열 전달

  return null;
};

export default LoginStatus;