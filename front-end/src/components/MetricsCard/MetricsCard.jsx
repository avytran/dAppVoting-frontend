import React, { useState, useEffect, useCallback } from 'react';
import './MetricsCard.css';
import chartIcon from "../../assets/icons/chart-icon.png";
import { getContract } from '../../utils/web3';

export const MetricsCard = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = useCallback(async () => {
    try {
      const contract = await getContract();
      const count = await contract.candidatesCount();
      const tempCandidates = [];

      for (let i = 1; i <= Number(count); i++) {
        const deleted = await contract.isDeleted(i);
        if (!deleted) {
          const c = await contract.candidates(i);
          tempCandidates.push({
            id: Number(c.id),
            name: c.name,
            votes: Number(c.voteCount),
          });
        }
      }

      setCandidates(tempCandidates);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch voting result Error:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();

    let votingContract;
    const setupListeners = async () => {
      votingContract = await getContract();

      votingContract.on("Voted", (voter, candidateId, name) => {
        console.log(`Metrics update: New vote for ${name}`);
        fetchMetrics();
      });

      votingContract.on("CandidateAdded", () => fetchMetrics());
      votingContract.on("CandidateDeleted", () => fetchMetrics());
    };

    setupListeners();

    const interval = setInterval(fetchMetrics, 30000);

    return () => {
      if (votingContract) {
        votingContract.removeAllListeners("Voted");
        votingContract.removeAllListeners("CandidateAdded");
        votingContract.removeAllListeners("CandidateDeleted");
      }
      clearInterval(interval);
    };
  }, [fetchMetrics]);

  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  if (isLoading) return <div className="metrics-loading">Updating stats...</div>;

  return (
    <div className="metrics-container glass-panel">
      <div className="metrics-header">
        <div className="title-group">
          <img className="icon" src={chartIcon} alt="chart" />
          <h3>Live Election Metrics</h3>
        </div>
        <div className="live-status">
          <span className="dot pulse"></span> LIVE ON-CHAIN
        </div>
      </div>

      {/* Progress Bars */}
      <div className="stats-section">
        {candidates.map((c) => {
          const percent = totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0;
          return (
            <div key={c.id} className="stat-item">
              <div className="stat-info">
                <span className="name">{c.name}</span>
                <span className="percent">{percent}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percent}%`,
                    background: percent === 0 ? 'transparent' : 'linear-gradient(90deg, #6366f1, #10b981)'
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="divider" />

      {/* Rankings */}
      <div className="rankings-section">
        <h4>RANKINGS</h4>
        {sortedCandidates.length > 0 ? (
          sortedCandidates.map((c, index) => (
            <div key={c.id} className={`rank-item ${index === 0 && c.votes > 0 ? 'leader' : ''}`}>
              <div className="rank-left">
                <span className="rank-number">#{index + 1}</span>
                <span className="rank-name">{c.name}</span>
              </div>

              {index === 0 && c.votes > 0 && (
                <span className="lead-tag">
                  Leading by {totalVotes > 0 ?
                    Math.round(((c.votes - (sortedCandidates[1]?.votes || 0)) / totalVotes) * 100) : 0}%
                </span>
              )}
              <span className="votes-display">{c.votes} votes</span>
            </div>
          ))
        ) : (
          <p className="no-data">No candidates found.</p>
        )}
      </div>
    </div>
  );
};