import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
<nav className="navbar-container">
  <div className="logo">VOTE<span>CHAIN</span></div>
  <div className="wallet-section">
     <div className="network-pill"><div className="dot"></div>Sepolia</div>
     <div className="address-pill">0x7F4A...9E1B</div>
  </div>
</nav>
  );
};