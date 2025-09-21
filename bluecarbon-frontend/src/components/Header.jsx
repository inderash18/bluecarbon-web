// src/components/Header.jsx
import React from "react";


function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/react.svg" alt="NGO Logo" className="logo" />
        <h1>Blue Carbon NGO</h1>
      </div>
      <nav className="header-nav">
        <a href="#">About Us</a>
        <a href="#">Projects</a>
        <a href="#">Reports</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
}

export default Header;
