// 1. Import dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css";

// 2. Define the NavBar component
const NavBar = () => {
  // 3. Return some JSX
  return (
    <nav className="power-rangers-nav">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/season">Season</Link></li>
        <li><Link to="/characters">Characters</Link></li>
        <li><Link to="/megazord">Megazord</Link></li>
        <li><Link to="/services">Services</Link></li>
      </ul>
    </nav>
  );
};

// 4. Export the component
export default NavBar;
