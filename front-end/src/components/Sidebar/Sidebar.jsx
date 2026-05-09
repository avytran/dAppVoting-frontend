import React from 'react';
import './Sidebar.css';
import GridViewIcon from '@mui/icons-material/GridView';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Sidebar = () => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <GridViewIcon /> },
    { id: 'candidates', label: 'Candidates', icon: <PeopleIcon />, active: true },
    { id: 'config', label: 'Config', icon: <SettingsIcon /> },
    { id: 'transactions', label: 'Transactions', icon: <ReceiptLongIcon /> },
  ];

  return (
    <aside className="sidebar-container">
      {/* Profile Section */}
      <div className="admin-profile">
        <div className="admin-avatar">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
        </div>
        <div className="admin-info">
          <h2 className="admin-name">Admin Portal</h2>
          <p className="admin-subtext">Network Governance</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="sidebar-footer">
        <div className="block-status">
          <span className="status-dot"></span>
          <span className="block-number">Block: #18,492,021</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;