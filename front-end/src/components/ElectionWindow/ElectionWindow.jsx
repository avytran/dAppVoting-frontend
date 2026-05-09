import React, { useState } from 'react';
import './ElectionWindow.css';

const ElectionWindow = () => {
  const [startTime, setStartTime] = useState('11/01/2024, 09:00');
  const [endTime, setEndTime] = useState('11/05/2024, 06:00');

  return (
    <div className="election-window-card">
      <div className="election-header">
        <i className="fa-regular fa-clock clock-icon"></i>
        <h2>Election Window</h2>
      </div>

      <div className="election-inputs">
        <div className="input-field-group">
          <label>Start Time</label>
          <div className="input-wrapper">
            <input 
              type="text" 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
            />
          </div>
        </div>

        <div className="input-field-group">
          <label>End Time</label>
          <div className="input-wrapper">
            <input 
              type="text" 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <button className="update-transaction-btn">
        <i className="fa-solid fa-arrows-rotate"></i>
        Update (Transaction)
      </button>
    </div>
  );
};

export default ElectionWindow;