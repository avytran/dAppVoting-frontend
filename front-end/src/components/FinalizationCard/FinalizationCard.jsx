import React, { useState, useEffect } from 'react';
import { getContract } from '../../utils/web3';
import './FinalizationCard.css';

export const FinalizationCard = () => {
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const checkTime = async () => {
      try {
        const contract = await getContract();
        const endTime = await contract.endTime();
        
        const now = Math.floor(Date.now() / 1000);

        if (now > Number(endTime)) {
          setIsOver(true);
        }
      } catch (error) {
        console.error("Check time Error", error);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isOver) {
    return (
      <div className="finalization-card-container ongoing">
        <div className="final-header">
          <span className="status-icon">⏳</span>
          <h3>Status: In Progress</h3>
        </div>
        <p className="final-description">
          The election is currently active. Voters can still cast their ballots.
        </p>
      </div>
    );
  }

  return (
    <div className="finalization-card-container finalized">
      <div className="final-header">
        <span className="lock-icon">🔐</span>
        <h3>Finalization</h3>
      </div>
      
      <p className="final-description">
        The election period has ended. The system has <b>automatically finalized</b> the results. 
        The state is now locked on the blockchain permanently.
      </p>

      <div className="status-tag-finalized">
        <span className="check-icon">✔️</span> Election Finalized Automatically
      </div>
    </div>
  );
};