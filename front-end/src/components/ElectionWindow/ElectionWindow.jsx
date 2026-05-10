import React, { useState, useEffect, useCallback } from 'react';
import { getContract } from '../../utils/web3';
import { formatUnixToDatetime } from '../../utils/formatUnixToDateTime';
import './ElectionWindow.css';

export const ElectionWindow = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchCurrentTimes = useCallback(async () => {
    try {
      const contract = await getContract();
      const s = await contract.startTime();
      const e = await contract.endTime();

      if (s > 0) setStartTime(formatUnixToDatetime(s));
      if (e > 0) setEndTime(formatUnixToDatetime(e));
    } catch (error) {
      console.error("Fetch time Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchCurrentTimes();
  }, [fetchCurrentTimes]);

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      const contract = await getContract();

      const startUnix = Math.floor(new Date(startTime).getTime() / 1000);
      const endUnix = Math.floor(new Date(endTime).getTime() / 1000);

      const tx = await contract.setVotingPeriod(startUnix, endUnix, {
        gasLimit: 100000
      });

      console.log("Transaction Hash:", tx.hash);
      await tx.wait();
      
      alert("Time updated successfully!");
      
      await fetchCurrentTimes();

    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="election-window-card">
      <div className="election-header">
        <i className="fa-regular fa-clock clock-icon"></i>
        <h2>Election Window</h2>
      </div>

      <div className="election-inputs">
        <div className="input-field-group">
          <label>Start Time (On-chain)</label>
          <div className="input-wrapper">
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="input-field-group">
          <label>End Time (On-chain)</label>
          <div className="input-wrapper">
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button
        className={`update-transaction-btn ${isUpdating ? 'loading' : ''}`}
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        <i className={`fa-solid ${isUpdating ? 'fa-spinner fa-spin' : 'fa-arrows-rotate'}`}></i>
        {isUpdating ? ' Updating...' : ' Update (Transaction)'}
      </button>
    </div>
  );
};