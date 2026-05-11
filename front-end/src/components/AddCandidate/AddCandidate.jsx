import React, { useState } from 'react';
import './AddCandidate.css';
import { getContract } from '../../utils/web3';
import { useToast } from '../../contexts/ToastContext';

export const AddCandidate = () => {
  const [candidateName, setCandidateName] = useState('');
  const [manifesto, setManifesto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!candidateName.trim()) {
      showError('Please fill the candidate name');
      return;
    }

    setIsSubmitting(true);

    try {
      const contract = await getContract();

      const tx = await contract.addCandidate(candidateName);

      showSuccess('Transaction sent! Waiting for confirmation from Blockchain...');

      await tx.wait();

      showSuccess('Candidate added successfully!');

      setCandidateName('');
      setManifesto('');

    } catch (error) {
      console.error("Add Candidate Error", error);

      const errorMessage = error.reason || error.message || "Transaction failed!";
      showError(errorMessage);
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
      </div>
    </>
  );
};