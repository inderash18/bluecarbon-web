import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const location = useLocation();

  // Check if wallet is already connected on component mount
  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      } else {
        alert('Please install MetaMask to connect your wallet!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setIsConnected(false);
      setWalletAddress('');
    } else {
      setWalletAddress(accounts[0]);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }
  };

  // Cleanup event listener on unmount
  useEffect(() => {
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const isActiveLink = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const navigate = useNavigate();
  // Check app auth (set by login)
  const [isAuthed, setIsAuthed] = useState(() => {
    try { return !!localStorage.getItem('bc_auth'); } catch { return false; }
  });

  useEffect(() => {
    const handler = () => {
      try { setIsAuthed(!!localStorage.getItem('bc_auth')); } catch { setIsAuthed(false); }
    };
    // simple listener for storage changes
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const logout = () => {
    try { localStorage.removeItem('bc_auth'); } catch {}
    setIsAuthed(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onToggleSidebar} aria-label="Toggle menu">
          <i className="fas fa-bars"></i>
        </button>
        <Link to="/" className="logo">
          carbon
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/dashboard" className={isActiveLink('/dashboard')}>
          Dashboard
        </Link>
        <Link to="/map" className={isActiveLink('/map')}>
          Map View
        </Link>
        <Link to="/upload" className={isActiveLink('/upload')}>
          Upload
        </Link>
        <Link to="/tokens" className={isActiveLink('/tokens')}>
          Tokens
        </Link>
        <Link to="/webcam" className={`nav-link ${isActiveLink('/webcam')}`}>
          <i className="fas fa-camera"></i>
          WebCam
        </Link>
      </nav>

      <div className="header-right">
        {isAuthed ? (
          <div className="auth-area">
            <button className="logout-btn" onClick={logout} aria-label="Logout">
              Logout
            </button>
          </div>
        ) : (
          (isConnected ? (
            <div className="wallet-info">
              <span className="wallet-address" title={walletAddress}>
                {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
              </span>
              <button 
                className="disconnect-btn" 
                onClick={disconnectWallet}
                aria-label="Disconnect wallet"
              >
                <div className="connection-status connected">
                  <span className="status-dot"></span>
                  Connected
                </div>
              </button>
            </div>
          ) : (
            <button className="connect-wallet-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
          )))
        }
      </div>
    </header>
  );
};

export default Header;