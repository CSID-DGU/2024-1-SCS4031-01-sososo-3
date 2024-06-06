import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../RoomContext";
import { GoPerson } from 'react-icons/go';
import { CiLock } from 'react-icons/ci';
import "../App.css";

function Login() {    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 변수 추가
  const { setRoomId, updateName, updateGroupCode, updateUserLevel } = useContext(RoomContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted");
      console.log("Email:", email);
      console.log("Password:", password);

      axios.post("http://localhost:3001/login", { email, password })
      .then(result => {
          console.log(result);
          if(result.data.status === "Success"){
              setRoomId(result.data.roomId);
              updateName(result.data.name);
              updateGroupCode(result.data.groupCode);
              updateUserLevel(result.data.userLevel);
              console.log("roomId:", result.data.roomId);
              console.log("name:", result.data.name);
              console.log("groupCode:",result.data.groupCode);
              console.log("userLevel:",result.data.userLevel);

              // 로그인 정보를 Local Storage에 저장
              localStorage.setItem("loggedInUser", JSON.stringify(result.data));

              navigate(`/${result.data.roomId}`);
          } else {
              setErrorMessage("아이디 또는 비밀번호가 맞지 않아요. 다시 입력해주세요.");
          }
      })
      .catch(err => {
          console.log(err);
          setErrorMessage("아이디 또는 비밀번호가 맞지 않아요. 다시 입력해주세요."); // 오류 메시지 설정
      });
  }

  return (
    <div className="app">
      <div className="login-container">
          <h2>SOSOSO</h2>
          <form onSubmit={handleSubmit}>
              <div className="input-container">
                  <GoPerson className="input-icon" />
                  <input 
                      type="text" 
                      placeholder='이메일을 입력하세요' 
                      autoComplete='off' 
                      name='email' 
                      className='login-control rounded-0' 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                  />
              </div>
              
              <div className="input-container">
                  <CiLock className="input-icon" />
                  <input 
                      type="password" 
                      placeholder='비밀번호를 입력하세요' 
                      name='password' 
                      className='login-control rounded-0' 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                  />
              </div>

              {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 오류 메시지 출력 */}

              <div>
                  <button type="submit" className="login-button">
                      LOGIN
                  </button>
              </div>
          </form>
      </div>
    </div>
  );
}

export default Login;
