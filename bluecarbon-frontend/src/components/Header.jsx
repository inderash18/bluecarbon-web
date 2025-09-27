import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Please install MetaMask to connect your wallet!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onToggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <Link to="/" className="logo">
          carbon
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/map">Map View</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/tokens">Tokens</Link>
      </nav>

      <div className="header-right">
        {isConnected ? (
          <div className="wallet-info">
            <span className="wallet-address">
              {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            </span>
            <div className="connection-status connected">
              <span className="status-dot"></span>
              Connected
            </div>
          </div>
        ) : (
          <button className="connect-wallet-btn" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
