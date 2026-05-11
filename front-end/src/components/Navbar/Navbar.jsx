import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Navbar.css';

export const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState('Not Connected');

  const fetchWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          const address = accounts[0].address;
          setWalletAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    }
  };

  useEffect(() => {
    fetchWallet();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          const address = accounts[0];
          setWalletAddress(`${address.substring(0, 6)}...${address.substring(address.length - 4)}`);
        } else {
          setWalletAddress('Not Connected');
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', fetchWallet);
      }
    };
  }, []);

  return (
    <nav className="navbar-container">
      <div className="logo">VOTE<span>CHAIN</span></div>
      <div className="wallet-section">
        <div className="address-pill">{walletAddress}</div>
      </div>
    </nav>
  );
};