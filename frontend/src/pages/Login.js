import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RoomContext } from "../RoomContext";

import "../App.css";

function Login() {    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
              alert("Login Success");
              navigate("/main");
          } else {
              navigate("/login");
              alert("You are not registered to this service");
          }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="app">

      <div className="login-container">
          <h2>SOSOSO</h2>
          <form onSubmit={handleSubmit}>

              <div className="login-id">
                  <label htmlFor="email">E-mail</label>
                  <input 
                      type="text" 
                      placeholder='Enter Email' 
                      autoComplete='off' 
                      name='email' 
                      className='login-control rounded-0' 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                  />
              </div>
              
              <div className="login-pd">
                  <label htmlFor="password">Password</label>
                  <input 
                      type="password" 
                      placeholder='Enter Password' 
                      name='password' 
                      className='login-control rounded-0' 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                  />
              </div>

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