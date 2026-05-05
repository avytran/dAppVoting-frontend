import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_ACTIVITIES } from '../../mocks/activities';
import './ActivityCard.css';

const ActivityCard = () => {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES)
  const [secondsAgo, setSecondsAgo] = useState(23);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', color: '' });

  // Update timestamp for pending transaction
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo(prev => prev + 30);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = () => {
    const minutes = Math.floor(secondsAgo / 60);
    const secs = secondsAgo % 60;
    if (minutes < 1) {
      return `~ ${secs} sec ago`;
    }
    return `~ ${minutes} min ${secs > 0 ? secs + 's' : ''} ago`;
  };

  const showToast = useCallback((message, color) => {
    setToast({ show: true, message, color });
    setTimeout(() => {
      setToast({ show: false, message: '', color: '' });
    }, 2200);
  }, []);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`Copied: ${text}`, '#3b82f6');
    } catch (err) {
      showToast('Unable to copy', '#ef4444');
    }
  }, [showToast]);

  const handleAddressClick = (address) => {
    copyToClipboard(address);
  };

  const handleViewFullHistory = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showModal]);

  return (
    <>
      <div className="activity-card">
        <div className="card-header">
          <div className="title-section">
            <i className="fas fa-link"></i>
            <h2>On-chain Activity</h2>
          </div>
          <div className="live-badge"><i className="fas fa-circle"></i> LIVE</div>
        </div>

        <div className="activity-list">
          {activities.slice(0, 3).map((item) => (
            <div key={item.id} className={`activity-item ${item.type}-item`}>
              <div className="activity-header">
                <span className={`badge-status badge-${item.type}`}>
                  <i className={item.type === 'pending' ? 'fas fa-clock' : 'fas fa-check-circle'}></i> {item.statusText}
                </span>
                <span className="timestamp">
                  {item.type === 'pending' ? <i className="far fa-hourglass-half"></i> : <i className="fas fa-check-double"></i>}
                  {' '}{formatTimestamp(item.timestamp)}
                </span>
              </div>

              <div className="activity-title">
                <i className={`fas ${item.icon}`}></i>
                <span>
                  {item.title} {item.targetName && <span className="vote-name">{item.targetName}</span>}
                  {item.candidateId && <span className="candidate-tag">Candidate #{item.candidateId}</span>}
                </span>
              </div>

              {/* Conditional Rendering based on item data */}
              {item.address && (
                <div className="address-hash" onClick={() => copyToClipboard(item.address)}>
                  <i className="fas fa-user-astronaut"></i> {item.address} {item.role && `(${item.role})`}
                </div>
              )}

              {item.type === 'pending' ? (
                <div className="gas-info">
                  <span><i className="fas fa-gas-pump"></i> Est. gas: {item.gasEst}</span>
                  <span><i className="fas fa-charging-station"></i> Fee: {item.priorityFee}</span>
                </div>
              ) : (
                <div className="block-info">
                  <span><i className="fas fa-cube"></i> <strong className="blue-text">Block #{item.blockNumber}</strong></span>
                  <span className="separator-dot"></span>
                  <span><i className="fas fa-gas-pump"></i> Gas: {item.gasUsed}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="history-footer">
          <div onClick={() => setShowModal(true)} className="history-link">
            <span>VIEW FULL HISTORY</span> <i className="fas fa-arrow-right"></i>
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
                  <div key={item.id} className={`history-list-item ${item.type}`}>
                    <div className="history-item-main">
                      <i className={`fas ${item.icon}`}></i>
                      <div className="history-text">
                        <p className="history-title-text">{item.title} {item.targetName}</p>
                        <span className="history-time">{item.timestamp}</span>
                      </div>
                    </div>
                    <div className="history-item-side">
                      <span className={`status-dot ${item.type}`}></span>
                      <span className="status-label">{item.statusText}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <p><i className="fas fa-database"></i> Showing {activities.length} total events</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActivityCard;