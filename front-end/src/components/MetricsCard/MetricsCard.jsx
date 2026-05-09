import './MetricsCard.css';
import chartIcon from "../../assets/icons/chart-icon.png";
import { MOCK_CANDIDATES } from '../../mocks/candidates';

export const MetricsCard = ({ candidates = MOCK_CANDIDATES }) => {
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="metrics-container">
      <div className="metrics-header">
        <div className="title-group">
          <img className="icon" src={chartIcon} />
          <h3>Live Election Metrics</h3>
        </div>
        <div className="live-status">
          <span className="dot"></span> LIVE FETCHING
        </div>
      </div>

      {/* Progress Bars */}
      <div className="stats-section">
        {candidates.map((c) => {
          const percent = totalVotes > 0 ? Math.round((c.votes / totalVotes) * 100) : 0;
          return (
            <div key={c.id} className="stat-item">
              <div className="stat-info">
                <span>{c.name}</span>
                <span className="percent">{percent}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      <hr className="divider" />

      {/* Rankings */}
      <div className="rankings-section">
        <h4>RANKINGS</h4>
        {sortedCandidates.map((c, index) => (
          <div key={c.id} className={`rank-item ${index === 0 ? 'leader' : ''}`}>
            <span className="rank-number">{index + 1}</span>
            <span className="rank-name">{c.name}</span>
            {index === 0 && (
              <span className="lead-tag">
                Leading by {totalVotes > 0 ? Math.round(((c.votes - sortedCandidates[1]?.votes || 0) / totalVotes) * 100) : 0}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};