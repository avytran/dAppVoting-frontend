import React, { useState, useEffect, useCallback } from 'react';
import './AdminTitleCard.css';
import { getContract } from '../../utils/web3';
import { ethers } from 'ethers';

export const AdminTitleCard = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [electionStatus, setElectionStatus] = useState('Checking...');
  const [isOver, setIsOver] = useState(false);

  const updateStatusLogic = useCallback((startTime, endTime) => {
    const now = Math.floor(Date.now() / 1000);
    const start = Number(startTime);
    const end = Number(endTime);

    if (now < start) {
      setElectionStatus('Scheduled - Preparing Assets');
      setIsOver(false);
    } else if (now >= start && now <= end) {
      setElectionStatus('Election Live - Monitoring Real-time');
      setIsOver(false);
    } else {
      setElectionStatus('Election Closed - Results Immutable');
      setIsOver(true);
    }
  }, []);

  useEffect(() => {
    let votingContract;

    const init = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setWalletAddress(await signer.getAddress());
        }

        votingContract = await getContract();
        const s = await votingContract.startTime();
        const e = await votingContract.endTime();

        updateStatusLogic(s, e);

        votingContract.on("VotingPeriodUpdated", (newStart, newEnd) => {
          console.log("TitleCard: Election window updated!");
          updateStatusLogic(newStart, newEnd);
        });

      } catch (error) {
        console.error("Init TitleCard Error:", error);
      }
    };

    init();

    return () => {
      if (votingContract) {
        votingContract.removeAllListeners("VotingPeriodUpdated");
      }
    };
  }, [updateStatusLogic]);

  const formatAddress = (addr) => addr ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}` : 'Connecting...';

  return (
    <div className="admin-title-card">
      <div className="admin-content">
        <span className="security-label">SECURITY LAYER ACTIVE</span>
        <h1>Admin Access Verified</h1>
        <p className="connection-info">
          Connected via <span>{formatAddress(walletAddress)}</span>
        </p>
      </div>

      <div className={`status-badge ${isOver ? 'closed' : 'live'}`}>
        <div className={`status-dot ${isOver ? '' : 'pulse'}`}></div>
        <span>{electionStatus}</span>
      </div>
    </div>
  );
};