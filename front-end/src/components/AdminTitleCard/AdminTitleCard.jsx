import React from 'react';
import './AdminTitleCard.css';

const AdminTitleCard = ({ walletAddress }) => {
  return (
    <div className="admin-title-card">
      <div className="admin-content">
        <span className="security-label">SECURITY LAYER ACTIVE</span>
        <h1>Admin Access Verified</h1>
        <p className="connection-info">
          Connected via <span>{walletAddress || '0x7F4A...9E1B'}</span>
        </p>
      </div>
      
      <div className="status-badge">
        <div className="status-dot"></div>
        <span>Election Closed - Results are now immutable</span>
      </div>
    </div>
  );
};

export default AdminTitleCard;