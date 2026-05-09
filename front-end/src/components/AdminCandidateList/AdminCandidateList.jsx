import React, { useState } from 'react';
import './AdminCandidateList.css';
import { MOCK_CANDIDATES } from '../../mocks/candidates';

export const AdminCandidateList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : (
              candidates.map((candidate, index) => (
                <tr key={index} className="table-row">
                  <td>
                    <div className="candidate-info">
                      <div className="avatar-circle">
                        {candidate.id}
                      </div>
                      <span className="candidate-name">{candidate.name}</span>
                    </div>
                  </td>
                  <td className="manifesto-cell">
                    {candidate.manifesto}
                  </td>
                  <td>
                    <span className="status-badge-confirmed">
                      <span className="material-symbols-outlined status-icon">check_circle</span>
                      {candidate.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-view-tx">
                      View Tx <span className="material-symbols-outlined text-sm">open_in_new</span>
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