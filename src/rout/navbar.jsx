import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <div className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/getmain" className="nav-link">My Blog</NavLink>
      <NavLink to="/addblog" className="nav-link">Add Blog</NavLink>
      <NavLink to="/signup" className="nav-link">Signup</NavLink>
      <NavLink to="/login" className="nav-link">Login</NavLink>
      <NavLink to="/logout" className="nav-link">Logout</NavLink>
    </div>
  );
}

export default Navbar;
