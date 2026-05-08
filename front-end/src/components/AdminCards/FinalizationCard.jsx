import React from 'react';
import './FinalizationCard.css';

const FinalizationCard = () => {
  return (
    <div className="finalization-card-container">
      <div className="final-header">
        <span className="lock-icon">🔐</span>
        <h3>Finalization</h3>
      </div>
      
      <p className="final-description">
        The election has been finalized. Result calculation is complete and the state is locked on the blockchain permanently.
      </p>

      <button className="btn-finalized" disabled>
        <span className="check-icon">✔️</span> Election Finalized
      </button>
    </div>
  );
};

export default FinalizationCard;