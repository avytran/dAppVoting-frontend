import React from 'react';
import './CandidateList.css';
import CheckCircleIcon from '@mui/icons-material/Check';

const candidatesData = [
  {
    id: "001",
    name: "Marcus Thorne",
    party: "Progressive Alliance",
    votes: "64,301",
    percentage: "45%",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    hasVoted: true,
    estGas: null
  },
  {
    id: "002",
    name: "Elena Vance",
    party: "Democratic Unity",
    votes: "50,012",
    percentage: "35%",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    hasVoted: false,
    estGas: "~0.00021 ETH"
  },
  {
    id: "003",
    name: "Julian Lee",
    party: "Vision Party",
    votes: "28,580",
    percentage: "20%",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julian",
    hasVoted: false,
    estGas: "~0.00021 ETH"
  }
];

const CandidateList = () => {
  return (
    <div className="candidate-list-container">
      <div className="list-header">
        <h2 className="list-title">Candidate Polls</h2>
        <span className="list-subtitle">{candidatesData.length} Candidates Participating</span>
      </div>

      <div className="candidates-wrapper">
        {candidatesData.map((candidate) => (
          <div 
            key={candidate.id} 
            className={`candidate-card ${candidate.hasVoted ? 'voted-style' : 'standard-style'}`}
          >
            {candidate.hasVoted && (
              <div className="voted-badge">
                You Voted For
              </div>
            )}

            <div className="card-content">
              {/* Avatar Section */}
              <div className={`avatar-wrapper ${candidate.hasVoted ? 'avatar-voted' : 'avatar-standard'}`}>
                <div className="shimmer-effect"></div>
                <img 
                  className="avatar-img" 
                  alt={`Portrait of ${candidate.name}`} 
                  src={candidate.image} 
                />
              </div>

              {/* Info Section */}
              <div className="info-section">
                <div className="info-header">
                  <div className="name-box">
                    <div className="id-tag-wrapper">
                      <span className="id-tag">#{candidate.id}</span>
                      <h3 className="candidate-name">{candidate.name}</h3>
                    </div>
                    <div className="party-status">
                      <p className={`party-name ${candidate.hasVoted ? 'text-indigo' : 'text-slate'}`}>
                        {candidate.party}
                      </p>
                      <span className="onchain-status">
                        <span className="material-symbols-outlined icon-small">verified</span> On-chain
                      </span>
                    </div>
                  </div>
                  
                  <div className="vote-count-box">
                    <p className="votes-number">{candidate.votes}</p>
                    <p className="votes-label">Votes ({candidate.percentage})</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="actions-row">
                  {candidate.hasVoted ? (
                    <button className="btn-submitted">
                      <CheckCircleIcon sx={{ fontSize: 20, marginRight: '8px' }} />
                      Vote Submitted
                    </button>
                  ) : (
                    <div className="vote-btn-group">
                      <button className="btn-vote">
                        Vote Candidate
                      </button>
                      <span className="gas-estimate">
                        Est. Gas: {candidate.estGas}
                      </span>
                    </div>
                  )}
                  <button className="btn-details">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;