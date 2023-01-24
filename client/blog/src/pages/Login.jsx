import axios from "axios";
import React, { useRef, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      // await axios.post("/auth/login", {
      //   email: emailRef.current.value,
      //   password: passwordRef.current.value,
      // });
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <div className="auth">
      <form className="form-box">
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          ref={emailRef}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          ref={passwordRef}
        />
        <button onClick={onLogin}>Login</button>
        {err ? (
          <div id="error" className="messageBar">
            {err}
          </div>
        ) : null}
        <span>
          Don't have an Account?
          <br />
          <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
