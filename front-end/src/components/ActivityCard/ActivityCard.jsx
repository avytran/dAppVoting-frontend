import React, { useState, useEffect, useCallback } from 'react';
import './ActivityCard.css';

const ActivityCard = () => {
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
          <div className="live-badge">
            <i className="fas fa-circle" style={{ fontSize: '0.55rem', marginRight: '4px', color: '#10b981' }}></i> LIVE
          </div>
        </div>

        <div className="activity-list">
          {/* Pending Confirmation Item */}
          <div className="activity-item pending-item" data-type="pending">
            <div className="activity-header">
              <span className="badge-status badge-pending">
                <i className="fas fa-clock"></i> PENDING CONFIRMATION
              </span>
              <span className="timestamp">
                <i className="far fa-hourglass-half"></i> {formatTimestamp()}
              </span>
            </div>
            <div className="activity-title">
              <i className="fas fa-vote-yea"></i>
              <span>
                Voting for <span className="vote-name">Elena Vance</span>{' '}
                <span style={{ fontSize: '0.8rem', background: '#1e293b80', padding: '2px 8px', borderRadius: '20px' }}>
                  Candidate #2
                </span>
              </span>
            </div>
            <div 
              className="address-hash"
              onClick={() => handleAddressClick('0x4a2e...1f8d')}
            >
              <i className="fas fa-user-astronaut"></i> 0x4a2e...1f8d
            </div>
            <div className="gas-info">
              <span><i className="fas fa-gas-pump"></i> Est. gas: 21,000</span>
              <span><i className="fas fa-charging-station"></i> Priority fee: 1.5 Gwei</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '0.7rem', color: '#64748b', display: 'flex', gap: '12px' }}>
              <span><i className="far fa-clock"></i> Expires in ~ 12 blocks</span>
              <span><i className="fas fa-shield-alt"></i> Nonce: 47</span>
            </div>
          </div>

          {/* Transaction Confirmed Item */}
          <div className="activity-item confirmed-item" data-type="confirmed">
            <div className="activity-header">
              <span className="badge-status badge-confirmed">
                <i className="fas fa-check-circle"></i> CONFIRMED
              </span>
              <span className="timestamp">
                <i className="fas fa-check-double"></i> 2 mins ago
              </span>
            </div>
            <div className="activity-title">
              <i className="fas fa-exchange-alt"></i>
              <span>Transaction Finalized</span>
            </div>
            <div className="block-info">
              <span><i className="fas fa-cube"></i> <strong className="blue-text">Block #18239120</strong></span>
              <span className="separator-dot"></span>
              <span><i className="fas fa-tachometer-alt"></i> <strong className="green-text">Gas: 45,000</strong></span>
              <span><i className="fas fa-fire"></i> Used: 41,232</span>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#5b6e8c', display: 'flex', gap: '16px' }}>
              <span><i className="fas fa-hashtag"></i> Tx hash: 0x7f3e...bc92</span>
              <span><i className="fas fa-check"></i> Status: success</span>
            </div>
          </div>

          {/* Additional Confirmed Item */}
          <div className="activity-item confirmed-item" style={{ opacity: 0.9 }}>
            <div className="activity-header">
              <span className="badge-status badge-confirmed">
                <i className="fas fa-check-circle"></i> CONFIRMED
              </span>
              <span className="timestamp">12 mins ago</span>
            </div>
            <div className="activity-title">
              <i className="fas fa-coins"></i>
              <span>Delegate Claim · Elena Vance Campaign</span>
            </div>
            <div className="block-info">
              <span><i className="fas fa-cube"></i> Block #18239110</span>
              <span className="separator-dot"></span>
              <span><i className="fas fa-gas-pump"></i> Gas: 32,000</span>
            </div>
            <div 
              className="address-hash" 
              style={{ marginTop: '6px', background: '#0f172f70', cursor: 'pointer' }}
              onClick={() => handleAddressClick('0x4a2e...1f8d')}
            >
              <i className="fas fa-id-card"></i> 0x4a2e...1f8d (voter)
            </div>
          </div>
        </div>

        <div className="history-footer">
          <div onClick={handleViewFullHistory} className="history-link">
            <span>VIEW FULL HISTORY</span> <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        <div className="footer-note">
          <i className="fas fa-database"></i> Real-time activity • Mainnet
        </div>
      </div>

      {/* Modal for Full History */}
      {showModal && (
        <div className="full-history-modal" onClick={handleModalBackdropClick}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <i className="fas fa-history"></i>
                <h3>Full On-chain History</h3>
              </div>
              <i 
                className="fas fa-times-circle close-modal-btn" 
                onClick={handleCloseModal}
              ></i>
            </div>
            <div className="modal-body">
              <div className="history-list">
                <div className="history-item pending-history">
                  <div><i className="fas fa-vote-yea"></i> <strong>Vote</strong> · Elena Vance (Candidate #2) <span className="history-badge">Pending</span></div>
                  <div className="history-detail">From: 0x4a2e...1f8d · Nonce: 47</div>
                </div>
                <div className="history-item confirmed-history">
                  <div><i className="fas fa-exchange-alt"></i> <strong>Transaction</strong> · Block #18239120 · Gas 45,000</div>
                  <div className="history-detail">Tx: 0x7f3e...bc92 · Status: Success</div>
                </div>
                <div className="history-item confirmed-history">
                  <div><i className="fas fa-coins"></i> <strong>Claim Delegation</strong> · Elena Vance Campaign Fund</div>
                  <div className="history-detail">Block #18239110 · Gas 32,000</div>
                </div>
                <div className="history-item confirmed-history">
                  <div><i className="fas fa-file-signature"></i> <strong>Proposal Submission</strong> · Governance #1042</div>
                  <div className="history-detail">Block #18239098 · Gas 67,200</div>
                </div>
                <div className="history-item pending-history">
                  <div><i className="fas fa-hourglass-half"></i> <strong>Vote</strong> · Elena Vance (Candidate #2) resubmission</div>
                  <div className="history-detail">Pending nonce: 48</div>
                </div>
              </div>
              <p className="history-footer-note">
                <i className="fas fa-link"></i> On-chain data: 15 total events
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-notification" style={{ border: `1px solid ${toast.color}` }}>
          {toast.message}
        </div>
      )}
    </>
  );
};

export default ActivityCard;