import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AdminPortal } from './pages/AdminPortal';
import { Dashboard } from './pages/Dashboard';
import { useToast } from './contexts/ToastContext';
import './App.css';

const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS?.toLowerCase();

function App() {
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { showError } = useToast();

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);
      } catch (err) {
        console.error("User denied access");
      }
    } else {
      showError("Please install MetaMask!");
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      const userAddr = accounts[0].toLowerCase();
      setAccount(userAddr);
      const checkAdmin = userAddr === ADMIN_ADDRESS;
      setIsAdmin(checkAdmin);
      
      if (checkAdmin) navigate('/admin');
      else navigate('/');
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
        <div className="connect-wrapper">
          <div className="connect-card">
            <div className="icon-box">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h1 className="connect-title">VOTE<span>CHAIN</span></h1>
            <p className="connect-subtitle">Decentralized Voting Infrastructure</p>
            
            <div className="divider-line"></div>
            
            <button className="connect-button" onClick={connectWallet}>
              Connect MetaMask
            </button>
            
            <p className="connect-footer">Secure • Transparent • Immutable</p>
          </div>
        </div>
      ) : (
        <div className="main-content">
          <Routes>
            <Route path="/admin" element={isAdmin ? <AdminPortal account={account} /> : <Navigate to="/" />} />
            <Route path="/" element={!isAdmin ? <Dashboard account={account} /> : <Navigate to="/admin" />} />
            <Route path="*" element={<Navigate to={isAdmin ? "/admin" : "/"} />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;