import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./navbar.scss";

const Navbar = () => {
  const { currentUser,logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/" className="link logo">
            <img src="/logo.png" alt="Dev Log" className="logo-image" style={{paddingRight:"10px"}}/>
            <h2 className="logo-text">Dev Log</h2>
          </Link>
        </div>
        <div className="links">
          <Link to="/?cat=uiux" className="link">UI/UX</Link>
          <Link to="/?cat=reactjs" className="link">React</Link>
          <Link to="/?cat=nodejs" className="link">nodejs</Link>
          {/* <Link to="/about" className="link">About</Link> */}
          <Link to="/contact" className="link">Contact</Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (<span onClick={logout} >Logout</span>) : <Link to="/login" className="link">Login</Link>}
          {currentUser ? (<span><Link to="/write" className="link write">Write</Link></span>) : null}
          {/* <span><Link to="/write" className="link write">Write</Link></span> */}
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
