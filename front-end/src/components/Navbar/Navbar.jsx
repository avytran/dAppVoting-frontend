import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">DApp Voting</div>
      <ul className="navbar-links">
        <li>Trang chủ</li>
        <li>Ứng viên</li>
        <li>Kết quả</li>
      </ul>
    </nav>
  );
};

export default Navbar;