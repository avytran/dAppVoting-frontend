import React from 'react';
import './Titlecard.css';

const Titlecard = () => {
  return (
    <div className="voting-banner">
      <div className="banner-main">
        <div className="status-badge">
          <span className="pulse-dot"></span> LIVE ELECTION
        </div>
        <h1 className="banner-title">National Referendum 2024</h1>
        
        <div className="banner-stats">
          <div className="stat-box">
            <p className="stat-label">ENDS IN</p>
            <p className="stat-value timer">02:14:22</p>
          </div>
          <div className="stat-box">
            <p className="stat-label">TOTAL VOTES</p>
            <p className="stat-value">142,893</p>
          </div>
        </div>
      </div>

      <div className="banner-actions">
        <button className="action-btn outline-btn">
          <i className="fa-solid fa-code"></i> View Smart Contract
        </button>
        <div className="wallet-btn-group">
          <button className="action-btn primary-btn">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> 
            0x742D...44E <span>Etherscan</span>
          </button>
          <button className="copy-icon-btn" title="Copy Address">
            <i className="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>

      <i className="fa-solid fa-box-archive decoration-icon"></i>
    </div>
  );
};

export default Titlecard;