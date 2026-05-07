import React, { useState } from 'react';
import './AdminCandidateList.css';

const candidatesData = [
  {
    id: "JS",
    name: "Jane Stevenson",
    manifesto: "Decentralizing city resources and implementing quadratic funding...",
    status: "Confirmed",
    txLink: "#"
  }
];

const AdminCandidateList = () => {
  // Đổi thành true để xem hiệu ứng Skeleton Loading (Khung xương mờ mờ)
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="lg:col-span-12 glass-panel rounded-xl overflow-hidden">
      <div className="p-md border-b border-white/5 flex justify-between items-center bg-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-400" data-icon="list_alt">list_alt</span>
          <h2 className="font-h3 text-h3 text-white">Current Candidates</h2>
        </div>
        <div className="flex gap-2">
          <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-medium border border-white/10 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Live On-Chain
          </span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-950/30">
            <tr>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-500">Candidate</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-500">Manifesto</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-500">Transaction Status</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <>
                <tr className="skeleton">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800/50"></div>
                      <div className="h-4 w-32 bg-slate-800/50 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="h-4 w-48 bg-slate-800/50 rounded"></div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="h-6 w-24 bg-slate-800/50 rounded-full"></div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="h-4 w-16 bg-slate-800/50 rounded"></div>
                  </td>
                </tr>
                <tr className="skeleton">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800/50"></div>
                      <div className="h-4 w-24 bg-slate-800/50 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="h-4 w-56 bg-slate-800/50 rounded"></div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="h-6 w-24 bg-slate-800/50 rounded-full"></div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="h-4 w-16 bg-slate-800/50 rounded"></div>
                  </td>
                </tr>
              </>
            ) : (
              candidatesData.map((candidate, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/20">
                        {candidate.id}
                      </div>
                      <span className="text-white font-medium">{candidate.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-slate-400 text-sm max-w-xs truncate">
                    {candidate.manifesto}
                  </td>
                  <td className="px-6 py-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                      <span className="material-symbols-outlined text-[14px]" data-icon="check_circle" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <button className="text-indigo-400 hover:text-indigo-300 font-medium text-sm flex items-center gap-1">
                      View Tx <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
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

export default AdminCandidateList;