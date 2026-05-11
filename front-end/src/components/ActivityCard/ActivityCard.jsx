import React, { useState, useEffect, useCallback } from 'react';
import './ActivityCard.css';
import { getContract } from '../../utils/web3';
import { useToast } from '../../contexts/ToastContext';

export const ActivityCard = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess } = useToast(); 

  const fetchBlockchainEvents = useCallback(async () => {
    try {
      const contract = await getContract();
      const currentBlock = await contract.runner.provider.getBlockNumber();
      const fromBlock = Math.max(0, currentBlock - 5000);

      const filter = contract.filters.Voted();
      const events = await contract.queryFilter(filter, fromBlock, "latest");

      const formattedEvents = events.map((event, index) => {
        const { voter, candidateId, candidateName, timestamp } = event.args;
        return {
          id: event.transactionHash || `vote-${index}`,
          type: 'confirmed',
          statusText: 'Confirmed',
          icon: 'fa-vote-yea',
          title: 'New Vote Cast',
          targetName: candidateName,
          candidateId: Number(candidateId),
          address: `${voter.substring(0, 6)}...${voter.substring(38)}`,
          fullAddress: voter,
          timestamp: Number(timestamp),
          blockNumber: event.blockNumber
        };
      }).reverse();

      setActivities(formattedEvents);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch events Error:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlockchainEvents();

    let contract;
    const subscribeToEvents = async () => {
      contract = await getContract();
      
      contract.on("Voted", (voter, candidateId, candidateName, timestamp, event) => {
        const newActivity = {
          id: event.transactionHash || Date.now(),
          type: 'confirmed',
          statusText: 'Just Now',
          icon: 'fa-vote-yea',
          title: 'New Vote Cast',
          targetName: candidateName,
          candidateId: Number(candidateId),
          address: `${voter.substring(0, 6)}...${voter.substring(38)}`,
          fullAddress: voter,
          timestamp: Number(timestamp),
          blockNumber: event.blockNumber
        };
        
        setActivities(prev => [newActivity, ...prev]);
        showSuccess(`New vote for ${candidateName}!`);
      });
    };

    subscribeToEvents();

    return () => {
      if (contract) contract.removeAllListeners("Voted");
    };
  }, [fetchBlockchainEvents, showSuccess]);

  const formatTimestamp = (ts) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - ts;
    if (diff < 5) return "Just now";
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showSuccess("Address copied to clipboard!");
  };

  return (
    <>
      <div className="activity-card glass-panel">
        <div className="card-header">
          <div className="title-section">
            <i className="fas fa-link icon-indigo"></i>
            <h2>On-chain Activity</h2>
          </div>
          <div className="live-badge pulse"><i className="fas fa-circle"></i> LIVE</div>
        </div>

        <div className="activity-list">
          {isLoading ? (
            <div className="loading-text">Scanning blocks...</div>
          ) : activities.length === 0 ? (
            <div className="no-data">No activity recorded yet.</div>
          ) : (
            activities.slice(0, 3).map((item) => (
              <div key={item.id} className="activity-item confirmed-item">
                <div className="activity-header">
                  <span className="badge-status badge-confirmed">
                    <i className="fas fa-check-circle"></i> {item.statusText}
                  </span>
                  <span className="timestamp">
                    <i className="far fa-clock"></i> {formatTimestamp(item.timestamp)}
                  </span>
                </div>

                <div className="activity-title">
                  <i className={`fas ${item.icon}`}></i>
                  <span>
                    {item.title} <strong>{item.targetName}</strong>
                    <span className="candidate-tag">ID: {item.candidateId}</span>
                  </span>
                </div>

                <div className="address-hash" onClick={() => copyToClipboard(item.fullAddress)}>
                  <i className="fas fa-user-astronaut"></i> {item.address}
                </div>

                <div className="block-info">
                  <span><i className="fas fa-cube"></i> Block <strong>#{item.blockNumber}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="history-footer">
          <div onClick={() => setShowModal(true)} className="history-link">
            <span>VIEW ALL LOGS</span> <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="full-history-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <i className="fas fa-history"></i>
                <h3>Full On-chain History</h3>
              </div>
              <i className="fas fa-times close-modal-btn" onClick={() => setShowModal(false)}></i>
            </div>

            <div className="modal-body">
              <div className="history-scroll-area">
                {activities.map((item) => (
                  <div key={item.id} className="history-list-item confirmed">
                    <div className="history-item-main">
                      <i className={`fas ${item.icon}`}></i>
                      <div className="history-text">
                        <p className="history-title-text">
                          <strong>{item.address}</strong> voted for <strong>{item.targetName}</strong>
                        </p>
                        <span className="history-time">{formatTimestamp(item.timestamp)} | Block #{item.blockNumber}</span>
                      </div>
                    </div>
                    <div className="history-item-side">
                      <span className="status-label">Confirmed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <p><i className="fas fa-database"></i> Total: {activities.length} transactions recorded</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};