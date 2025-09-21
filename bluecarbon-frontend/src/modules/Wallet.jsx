import React, { useState, useEffect } from 'react';
import './Wallet.css';

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState({
    eth: '0.00',
    tokens: '0.00'
  });
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showSendModal, setShowSendModal] = useState(false);

  const [transactions] = useState([
    {
      id: 1,
      type: 'receive',
      amount: '50.00',
      from: '0x8F3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      date: '2025-09-20',
      status: 'completed',
      hash: '0x1234...5678'
    },
    {
      id: 2,
      type: 'send',
      amount: '25.00',
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x9876543210abcdef',
      date: '2025-09-19',
      status: 'pending',
      hash: '0x5678...1234'
    }
  ]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        // Fetch balance after connection
        const ethBalance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [accounts[0], 'latest']
        });
        setBalance(prev => ({
          ...prev,
          eth: (parseInt(ethBalance, 16) / 1e18).toFixed(4)
        }));
      } else {
        alert('Please install MetaMask to connect your wallet!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setBalance({ eth: '0.00', tokens: '0.00' });
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    // Implement send transaction logic here
    setShowSendModal(false);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-header">
        <h1>Wallet</h1>
        {!isConnected ? (
          <button className="connect-btn" onClick={connectWallet}>
            <i className="fas fa-wallet"></i> Connect Wallet
          </button>
        ) : (
          <button className="disconnect-btn" onClick={disconnectWallet}>
            Disconnect
          </button>
        )}
      </div>

      {isConnected ? (
        <>
          <div className="wallet-overview">
            <div className="wallet-card">
              <div className="card-header">
                <h3>Wallet Address</h3>
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(walletAddress)}>
                  <i className="fas fa-copy"></i>
                </button>
              </div>
              <p className="address">{walletAddress}</p>
              <div className="balances">
                <div className="balance-item">
                  <span className="label">ETH Balance</span>
                  <span className="value">{balance.eth} ETH</span>
                </div>
                <div className="balance-item">
                  <span className="label">Carbon Credits</span>
                  <span className="value">{balance.tokens} BCT</span>
                </div>
              </div>
              <div className="wallet-actions">
                <button className="action-btn" onClick={() => setShowSendModal(true)}>
                  <i className="fas fa-paper-plane"></i> Send
                </button>
                <button className="action-btn">
                  <i className="fas fa-download"></i> Receive
                </button>
                <button className="action-btn">
                  <i className="fas fa-exchange-alt"></i> Swap
                </button>
              </div>
            </div>
          </div>

          <div className="wallet-tabs">
            <button
              className={`tab-btn ${selectedTab === 'overview' ? 'active' : ''}`}
              onClick={() => setSelectedTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${selectedTab === 'transactions' ? 'active' : ''}`}
              onClick={() => setSelectedTab('transactions')}
            >
              Transactions
            </button>
            <button
              className={`tab-btn ${selectedTab === 'nfts' ? 'active' : ''}`}
              onClick={() => setSelectedTab('nfts')}
            >
              Carbon NFTs
            </button>
          </div>

          {selectedTab === 'transactions' && (
            <div className="transactions-list">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Hash</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(tx => (
                    <tr key={tx.id}>
                      <td>
                        <span className={`tx-type ${tx.type}`}>
                          {tx.type === 'receive' ? (
                            <><i className="fas fa-arrow-down"></i> Receive</>
                          ) : (
                            <><i className="fas fa-arrow-up"></i> Send</>
                          )}
                        </span>
                      </td>
                      <td>{tx.amount} BCT</td>
                      <td className="address">{tx.from.substring(0, 6)}...{tx.from.substring(38)}</td>
                      <td className="address">{tx.to.substring(0, 6)}...{tx.to.substring(38)}</td>
                      <td>{tx.date}</td>
                      <td>
                        <span className={`tx-status ${tx.status}`}>{tx.status}</span>
                      </td>
                      <td>
                        <a href={`https://etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
                          {tx.hash}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="wallet-connect-prompt">
          <div className="prompt-content">
            <i className="fas fa-wallet"></i>
            <h2>Connect Your Wallet</h2>
            <p>Connect your wallet to access your carbon credits and manage transactions</p>
            <button className="connect-btn" onClick={connectWallet}>
              Connect MetaMask
            </button>
          </div>
        </div>
      )}

      {showSendModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Send Tokens</h2>
              <button className="close-btn" onClick={() => setShowSendModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleSendSubmit} className="send-form">
              <div className="form-group">
                <label>Recipient Address</label>
                <input
                  type="text"
                  placeholder="Enter recipient's address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <div className="amount-input">
                  <input
                    type="number"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                  />
                  <select>
                    <option value="bct">BCT</option>
                    <option value="eth">ETH</option>
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowSendModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="send-btn">
                  Send Tokens
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
