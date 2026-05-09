import React, { useState } from 'react';
import './AddCandidate.css';

export const AddCandidate = () => {
  const [candidateName, setCandidateName] = useState('');
  const [manifesto, setManifesto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const estimatedGas = '~0.0042 ETH';

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!candidateName.trim()) {
      showToast('Please enter candidate name', 'error');
      return;
    }
    
    if (!manifesto.trim()) {
      showToast('Please enter manifesto/bio', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      console.log('Submitting candidate:', {
        name: candidateName,
        manifesto: manifesto,
        gas: estimatedGas,
        timestamp: new Date().toISOString()
      });
      
      showToast('Transaction submitted successfully! Waiting for confirmation...', 'success');
      setIsSubmitting(false);
      
      // Optional: Clear form after success
      // setCandidateName('');
      // setManifesto('');
    }, 2000);
  };

  return (
    <>
      <div className="add-candidate-card">
        <div className="card-header">
          <div className="title-section">
            <i className="fas fa-user-plus"></i>
            <h2>Add Candidate</h2>
          </div>
          <div className="network-badge">
            <i className="fas fa-network-wired"></i> Ethereum Mainnet
          </div>
        </div>

        <form onSubmit={handleSubmit} className="candidate-form">
          {/* Candidate Full Name */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-user"></i> Candidate Full Name
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Satoshi Nakamoto"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              disabled={isSubmitting}
            />
            <p className="form-hint">Enter the full name of the candidate</p>
          </div>

          {/* Manifesto & Bio */}
          <div className="form-group">
            <label className="form-label">
              <i className="fas fa-file-alt"></i> Manifesto & Bio
            </label>
            <textarea
              className="form-textarea"
              placeholder="Briefly describe candidate's vision, goals, and background..."
              rows="5"
              value={manifesto}
              onChange={(e) => setManifesto(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
            <p className="form-hint">Describe candidate's vision, experience, and why they should be elected</p>
          </div>

          {/* Estimated Gas Fees */}
          <div className="gas-fees-box">
            <i className="fas fa-gas-pump"></i>
            <div className="gas-info">
              <span className="gas-label">Estimated Gas Fees</span>
              <span className="gas-value">{estimatedGas}</span>
            </div>
            <div className="gas-tooltip">
              <i className="fas fa-info-circle"></i>
              <span className="tooltip-text">Gas fees may vary based on network congestion</span>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Processing...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Submit Transaction
              </>
            )}
          </button>
        </form>

        {/* Success/Error Message */}
        {toast.show && (
          <div className={`toast-message ${toast.type}`}>
            <i className={toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
};