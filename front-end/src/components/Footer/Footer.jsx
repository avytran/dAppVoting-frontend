import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-logo">VOTECHAIN</div>
      
      <div className="footer-copyright">
        © 2024 VoteChain Protocol. Secure Democratic Ledger.
      </div>

    
      <div className="footer-links">
        <a href="#">Smart Contract</a>
        <a href="#">Etherscan</a>
        <a href="#">Documentation</a>
        <a href="#">Governance Forum</a>
      </div>
    </footer>
  );
};

export default Footer;