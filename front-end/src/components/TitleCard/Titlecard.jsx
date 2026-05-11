import React, { useState, useEffect, useCallback } from 'react';
import './TitleCard.css';
import { getContract } from '../../utils/web3';

export const TitleCard = () => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [timeLeft, setTimeLeft] = useState('00:00:00');
  const [contractAddress, setContractAddress] = useState('0x000...');

  const loadVotesAndAddress = useCallback(async () => {
    try {
      const contract = await getContract();
      setContractAddress(await contract.getAddress());

      const count = await contract.candidatesCount();
      let total = 0;
      for (let i = 1; i <= Number(count); i++) {
        const c = await contract.candidates(i);
        total += Number(c.voteCount);
      }
      setTotalVotes(total);
    } catch (error) {
      console.error("Error loading votes:", error);
    }
  }, []);

  useEffect(() => {
    let timerInterval;
    let votingContract;

    const init = async () => {
      await loadVotesAndAddress();
      
      votingContract = await getContract();
      const endTime = await votingContract.endTime();

      const updateTimer = () => {
        const now = Math.floor(Date.now() / 1000);
        const diff = Number(endTime) - now;
        if (diff > 0) {
          const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
          const mins = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
          const secs = (diff % 60).toString().padStart(2, '0');
          setTimeLeft(`${hours}:${mins}:${secs}`);
        } else {
          setTimeLeft('ENDED');
        }
      };

      updateTimer();
      timerInterval = setInterval(updateTimer, 1000);

      votingContract.on("Voted", () => {
        loadVotesAndAddress();
      });

      votingContract.on("VotingPeriodUpdated", () => {
        window.location.reload();
      });
    };

    init();

    return () => {
      if (timerInterval) clearInterval(timerInterval);
      if (votingContract) {
        votingContract.removeAllListeners("Voted");
        votingContract.removeAllListeners("VotingPeriodUpdated");
      }
    };
  }, [loadVotesAndAddress]);

  return (
    <div className="voting-banner">
      <div className="banner-main">
        <div className="status-badge">
          <span className="pulse-dot"></span> LIVE ELECTION
        </div>
        <h1 className="banner-title">National Referendum 2026</h1>
        
        <div className="banner-stats">
          <div className="stat-box">
            <p className="stat-label">ENDS IN</p>
            <p className="stat-value timer">{timeLeft}</p>
          </div>
          <div className="stat-box">
            <p className="stat-label">TOTAL VOTES</p>
            <p className="stat-value">{totalVotes.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <i className="fa-solid fa-box-archive decoration-icon"></i>
    </div>
  );
};