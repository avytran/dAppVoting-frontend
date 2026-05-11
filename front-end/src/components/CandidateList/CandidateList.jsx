import React, { useState, useEffect, useCallback } from 'react';
import './CandidateList.css';
import { MOCK_CANDIDATES } from '../../mocks/candidates';
import { getContract } from '../../utils/web3';
import { useToast } from '../../contexts/ToastContext';

export const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasVoted, setUserHasVoted] = useState(false);
  const [votedId, setVotedId] = useState(null);
  const { showSuccess, showError } = useToast();

  const loadBlockchainData = useCallback(async () => {
    try {
      const contract = await getContract();
      const count = await contract.candidatesCount();
      const signer = await contract.runner.getAddress();
      
      const hasVotedStatus = await contract.hasVoted(signer);
      setUserHasVoted(hasVotedStatus);

      if (hasVotedStatus) {
        const id = await contract.votedCandidateId(signer);
        setVotedId(Number(id));
      }

      const tempCandidates = [];
      for (let i = 1; i <= count; i++) {
        const deleted = await contract.isDeleted(i);
        if (!deleted) {
          const c = await contract.candidates(i);
          const candidateId = Number(c.id);
          const extraInfo = MOCK_CANDIDATES.find(m => m.id === candidateId) || {};

          tempCandidates.push({
            id: candidateId,
            name: c.name,
            voteCount: Number(c.voteCount),
            image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
            party: extraInfo.party || 'Independent'
          });
        }
      }
      setCandidates(tempCandidates);
      setIsLoading(false);
    } catch (error) {
      console.error("Load Data Error:", error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlockchainData();

    let contract;
    const setupEventListeners = async () => {
      contract = await getContract();

      contract.on("Voted", (voter, candidateId, candidateName) => {
        console.log(`New vote detected for ${candidateName}`);
        loadBlockchainData();
      });

      contract.on("CandidateAdded", () => loadBlockchainData());
      contract.on("CandidateDeleted", () => loadBlockchainData());
    };

    setupEventListeners();

    return () => {
      if (contract) {
        contract.removeAllListeners("Voted");
        contract.removeAllListeners("CandidateAdded");
        contract.removeAllListeners("CandidateDeleted");
      }
    };
  }, [loadBlockchainData]);

  const handleVote = async (id) => {
    try {
      const contract = await getContract();
      const tx = await contract.vote(id);
      showSuccess("Transaction sent! Confirming on-chain...");
      
      await tx.wait();
      showSuccess("Thank you for voting!");
    } catch (error) {
      showError(error.reason || "Vote failed. Is the election active?");
    }
  };

  if (isLoading) return <div className="loading">Connecting to Blockchain...</div>;

  return (
    <div className="candidate-list-container">
      <div className="list-header">
        <h2 className="list-title">Candidate Polls</h2>
        <span className="list-subtitle">{candidates.length} Candidates On-chain</span>
      </div>

      <div className="candidates-wrapper">
        {candidates.map((candidate) => {
          const isSelected = votedId === candidate.id;
          return (
            <div
              key={candidate.id}
              className={`candidate-card ${userHasVoted && !isSelected ? 'card-dimmed' : ''} ${isSelected ? 'card-selected' : ''}`}
            >
              <div className="card-content">
                <div className="avatar-wrapper">
                  <img className="avatar-img" alt={candidate.name} src={candidate.image} />
                </div>

                <div className="info-section">
                  <div className="info-header">
                    <div className="name-box">
                      <div className="id-tag-wrapper">
                        <span className="id-tag">#{candidate.id}</span>
                        <h3 className="candidate-name">{candidate.name}</h3>
                      </div>
                      <p className="party-name">{candidate.party}</p>
                    </div>

                    <div className="vote-count-box">
                      <p className="votes-number">{candidate.voteCount}</p>
                      <p className="votes-label">Votes</p>
                    </div>
                  </div>

                  <div className="actions-row">
                    {userHasVoted ? (
                      isSelected ? (
                        <button className="btn-voted-success" disabled>
                           Voted
                        </button>
                      ) : (
                        <button className="btn-voted-disabled" disabled>
                           Locked
                        </button>
                      )
                    ) : (
                      <button className="btn-vote" onClick={() => handleVote(candidate.id)}>
                        Vote Candidate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};