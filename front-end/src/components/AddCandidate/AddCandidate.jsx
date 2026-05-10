import React, { useState } from 'react';
import './AddCandidate.css';
import { getContract } from '../../utils/web3';

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
      showToast('Please fill the candidate name', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const contract = await getContract();

      const tx = await contract.addCandidate(candidateName);

      showToast('Transaction sent! Waiting for confirmation from Blockchain...', 'success');

      await tx.wait();

      showToast('Candidate added successfully!', 'success');

      setCandidateName('');
      setManifesto('');

    } catch (error) {
      console.error("Add Candidate Error", error);

      const errorMessage = error.reason || error.message || "Transaction failed!";
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
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