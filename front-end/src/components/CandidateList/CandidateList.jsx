import React from 'react';
import './CandidateList.css'; // Import file CSS chứa các class custom như glass-card

const candidatesData = [
  {
    id: "001",
    name: "Marcus Thorne",
    party: "Progressive Alliance",
    votes: "64,301",
    percentage: "45%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOxfDb8CQ9Gk2PpSOOJF-_Ef9YAVHLih1ypNZ9boTGRGdl9Lbtmq8vrT-qWFEwGrVcnWCoeolXrP1HZNAug_4S0-zJJk5Mo3sDO6qjx3h3Qr6h5QmBIsnx7nICPbOyh_Gim0QAIjpWm4LOysSzVCw9eqOnZRcLHSX2tbmnWYtEfDA1bmPHiCLCF1DKmDAsBWqoc9gJgWK8UU5lncqvb2Vx6avPvSPI6xA2A58EQiwBbmcVe5Ikd-MlJ8jfZT-XGOoAcpPCi3LYXQk",
    hasVoted: true,
    estGas: null
  },
  {
    id: "002",
    name: "Elena Vance",
    party: "Democratic Unity",
    votes: "50,012",
    percentage: "35%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKTJzUEX3BuNiIe4GTbc08aTiqun1NZ5EHrdUU5nGnhCs_ee9t1DMRZhLtzkba62XxK4kVBbMYasTFfPf2ZIyRk0jrAUCiHjwZj8xnlh8m590B_bTONzb82bHmrvJzS95vNhSzMOQJrNhKOWiqYXwyvFsQm8kcum8k9_ql4m0sgYiQfloDroSHs8Yo7rHzm1D2fqwVBn-3vOrArwQrrBGgEIyCgUZNQ1n0inUpXzQErCprKRuSCj_E3cJBTLekvqN1bRAClgtukj0",
    hasVoted: false,
    estGas: "~0.00021 ETH"
  },
  {
    id: "003",
    name: "Julian Lee",
    party: "Vision Party",
    votes: "28,580",
    percentage: "20%",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmBCkf4mpP_xjWPih2iUbUk0Z6YfujNP8kKTditEv-Cv_Tj65lUrpw7gzeTIHmkl0K3Rph1J9MwteosrdAUwK1zVcXWKMtOVAIDjuzareqxlu8G23D7JQQn2YBEb84K-Xl0llZa8rP-9MeI37w7nHOhOTmT1XBERXzIoQ4Ccum49dr6SXB2sCWMJ5Dza4c0wcu-ghe_nn0YnhXmo57pjWxJYbJuV3ic3JVVog59xGR7JbqrjjDMkQq0I9-dy5pGdmus1SBKP9ahYQ",
    hasVoted: false,
    estGas: "~0.00021 ETH"
  }
];

const CandidateList = () => {
  return (
    <div className="lg:col-span-7 space-y-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-h3 text-h3 text-white text-2xl font-bold">Candidate Polls</h2>
        <span className="text-body-sm text-slate-500">{candidatesData.length} Candidates Participating</span>
      </div>

      <div className="space-y-6">
        {candidatesData.map((candidate) => (
          <div 
            key={candidate.id} 
            className={`glass-card rounded-xl p-6 transition-all group relative overflow-hidden ${
              candidate.hasVoted ? 'border-indigo-500/40 bg-indigo-500/5' : 'glass-card-hover'
            }`}
          >
            {/* Hiển thị badge "You Voted For" nếu đã vote */}
            {candidate.hasVoted && (
              <div className="absolute top-0 right-0 px-4 py-1 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg z-10">
                You Voted For
              </div>
            )}

            <div className="flex items-start md:items-center gap-6">
              {/* Avatar */}
              <div className={`w-20 h-20 rounded-full bg-surface-container-highest flex-shrink-0 overflow-hidden relative transition-colors ${
                candidate.hasVoted ? 'border-2 border-indigo-500' : 'border border-white/10 group-hover:border-indigo-500/50'
              }`}>
                <div className="absolute inset-0 animate-shimmer"></div>
                <img 
                  className="w-full h-full object-cover relative z-10" 
                  alt={`Portrait of ${candidate.name}`} 
                  src={candidate.image} 
                />
              </div>

              {/* Thông tin ứng viên */}
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono-data bg-white/10 px-1.5 py-0.5 rounded text-slate-300">
                        #{candidate.id}
                      </span>
                      <h3 className="font-h3 text-lg text-white font-semibold">{candidate.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={`text-body-sm font-medium ${candidate.hasVoted ? 'text-indigo-400' : 'text-slate-500'}`}>
                        {candidate.party}
                      </p>
                      <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase tracking-tighter">
                        <span className="material-symbols-outlined text-[12px]">verified</span> On-chain
                      </span>
                    </div>
                  </div>
                  
                  {/* Số lượt Vote */}
                  <div className="text-right">
                    <p className="font-mono-data text-xl text-white font-bold">{candidate.votes}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Votes ({candidate.percentage})</p>
                  </div>
                </div>

                {/* Các nút tương tác */}
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  {candidate.hasVoted ? (
                    <button className="px-5 py-2 rounded-lg bg-indigo-500/20 text-indigo-300 text-body-sm font-bold border border-indigo-500/30 cursor-default opacity-80 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      Vote Submitted
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <button className="px-5 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40">
                        Vote Candidate
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono-data ml-1 italic">
                        Est. Gas: {candidate.estGas}
                      </span>
                    </div>
                  )}
                  <button className="px-5 py-2 rounded-lg text-slate-400 text-sm font-medium hover:text-white hover:bg-white/5 transition-all">
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