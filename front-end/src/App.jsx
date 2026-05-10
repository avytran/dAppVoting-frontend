import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AdminPortal } from './pages/AdminPortal';
import { Dashboard } from './pages/Dashboard';
import './App.css';

const ADMIN_ADDRESS = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266".toLowerCase();

function App() {
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
      } catch (err) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      const userAddr = accounts[0].toLowerCase();
      setAccount(userAddr);
      const checkAdmin = userAddr === ADMIN_ADDRESS;
      setIsAdmin(checkAdmin);
      
      if (checkAdmin) {
        navigate('/admin');
      } 
    } else {
      setAccount(null);
      navigate('/');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  return (
    <div className="app-container">
      {!account ? (
        <div className="flex items-center justify-center min-h-screen bg-slate-950">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">Blockchain Voting System</h1>
            <button 
              onClick={connectWallet}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all"
            >
              Connect MetaMask to Start
            </button>
          </div>
        </div>
      ) : (
        <Routes>
          <Route 
            path="/admin" 
            element={isAdmin ? <AdminPortal account={account} /> : <Navigate to="/vote" />} 
          />
          
          <Route 
            path="/" 
            element={!isAdmin ? <Dashboard account={account} /> : <Navigate to="/admin" />} 
          />

          <Route path="*" element={<Navigate to={isAdmin ? "/admin" : "/vote"} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;