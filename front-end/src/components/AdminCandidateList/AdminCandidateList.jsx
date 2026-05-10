import React, { useState, useEffect } from 'react';
import './AdminCandidateList.css';
import { getContract } from '../../utils/web3';
import { useToast } from '../../contexts/ToastContext';

export const AdminCandidateList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { showSuccess } = useToast();

  const loadBlockchainData = async () => {
    try {
      const contract = await getContract();
      const count = await contract.candidatesCount();
      const tempCandidates = [];

      for (let i = 1; i <= count; i++) {
        const deleted = await contract.isDeleted(i);
        if (!deleted) {
          const c = await contract.candidates(i);
          tempCandidates.push({
            id: Number(c.id),
            name: c.name,
            voteCount: Number(c.voteCount),
            status: "Confirmed",
            manifesto: "Click to view manifesto"
          });
        }
      }

      setCandidates(tempCandidates);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetching candidates error:", error);
      setIsLoading(false);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (!window.confirm(`Are you sure you want to delete candidate #${candidateId}?`)) return;

    try {
      setIsProcessing(true);
      const contract = await getContract();
      
      const tx = await contract.deleteCandidate(candidateId);
      console.log("Deleting transaction sent:", tx.hash);
      
      await tx.wait();
      
      showSuccess("Candidate deleted successfully!");
      await loadBlockchainData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error: " + (error.reason || "Transaction failed"));
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <section className="admin-candidate-section glass-panel">
      <div className="section-header">
        <div className="header-title">
          <span className="material-symbols-outlined icon-indigo">list_alt</span>
          <h2 className="title-text">Current Candidates</h2>
        </div>
        <div className="header-badges">
          <span className="badge-live">
            <span className="status-dot"></span>
            Live On-Chain
          </span>
        </div>
      </div>
      
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Manifesto</th>
              <th>Transaction Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : (
              candidates.map((candidate) => (
                <tr key={candidate.id} className="table-row">
                  <td>
                    <div className="candidate-info">
                      <div className="avatar-circle">{candidate.id}</div>
                      <span className="candidate-name">{candidate.name}</span>
                    </div>
                  </td>
                  <td className="manifesto-cell">{candidate.manifesto}</td>
                  <td>
                    <span className="status-badge-confirmed">
                      <span className="material-symbols-outlined status-icon">check_circle</span>
                      {candidate.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-delete-candidate"
                      onClick={() => handleDeleteCandidate(candidate.id)}
                      disabled={isProcessing}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const SkeletonRows = () => (
  <>
    {[1, 2].map(i => (
      <tr key={i} className="skeleton-row">
        <td><div className="skeleton-item s-avatar"></div><div className="skeleton-item s-text"></div></td>
        <td><div className="skeleton-item s-long-text"></div></td>
        <td><div className="skeleton-item s-badge"></div></td>
        <td><div className="skeleton-item s-btn"></div></td>
      </tr>
    ))}
  </>
);