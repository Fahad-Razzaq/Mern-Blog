import React from "react";
import axios from 'axios';
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [err,setErr] = useState(null)

  const navigate = useNavigate()

  const onRegister = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/auth/register",{
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      navigate("/login")
    } catch (error) {
      setErr(error.response.data)
      
    }
  }

  return (
    <div className="auth">
      <form className="form-box">
        <input required type="text" placeholder="Name" name="username" ref={usernameRef} />
        <input required type="email" placeholder="Email" name="email" ref={emailRef} />
        <input required type="password" placeholder="Password" name="password" ref={passwordRef} />
        {/* <input required type="text" placeholder="Name" name="username" onChange={handleChange} />
        <input required type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input required type="password" placeholder="Password" name="password" onChange={handleChange} /> */}
        <button onClick={onRegister}>Register</button>
        {err ? (<div id="error" className="messageBar">{err}</div>) : null}
        
        <span>
          Already have an Account?
          <br />
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
