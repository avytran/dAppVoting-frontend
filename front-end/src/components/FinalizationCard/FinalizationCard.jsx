import React, { useState, useEffect, useCallback } from 'react';
import { getContract } from '../../utils/web3';
import './FinalizationCard.css';

export const FinalizationCard = () => {
  const [isOver, setIsOver] = useState(false);

  const checkTimeLogic = useCallback((endTime) => {
    const now = Math.floor(Date.now() / 1000);
    if (now > Number(endTime)) {
      setIsOver(true);
    } else {
      setIsOver(false);
    }
  }, []);

  useEffect(() => {
    let contract;

    const init = async () => {
      try {
        contract = await getContract();
        
        const endTime = await contract.endTime();
        checkTimeLogic(endTime);

        contract.on("VotingPeriodUpdated", (newStart, newEnd) => {
          checkTimeLogic(newEnd);
        });

      } catch (error) {
        console.error("Check time Error", error);
      }
    };

    init();

    const interval = setInterval(async () => {
      if (contract) {
        const endTime = await contract.endTime();
        checkTimeLogic(endTime);
      }
    }, 30000);

    return () => {
      if (contract) {
        contract.removeAllListeners("VotingPeriodUpdated");
      }
      clearInterval(interval);
    };
  }, [checkTimeLogic]);

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