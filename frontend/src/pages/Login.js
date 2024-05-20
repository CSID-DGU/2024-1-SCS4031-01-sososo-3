import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted");
      console.log("Email:", email);
      console.log("Password:", password);

      axios.post("http://localhost:3001/login", { email, password })
      .then(result => {
          console.log(result);
          if(result.data === "Success"){
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
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="w-100">
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                      type="text" 
                      placeholder='Enter Email' 
                      autoComplete='off' 
                      name='email' 
                      className='form-control rounded-0' 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                      type="password" 
                      placeholder='Enter Password' 
                      name='password' 
                      className='form-control rounded-0' 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                  />
              </div>
              <div>
                  <button type="submit" className="login-button">
                      Login
                  </button>
              </div>
          </form>
      </div>
    </div>
  );
}

export default Login;