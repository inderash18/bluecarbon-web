import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import './Token.css';

const Token = () => {
  // Animation triggers using Intersection Observer
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [tabsRef, tabsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contentRef, contentInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedTab, setSelectedTab] = useState('tokens');
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintAmount, setMintAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const [tokens] = useState([
    {
      id: 1,
      tokenId: 'BCT-001',
      project: 'Mangrove Project A',
      amount: '8,000',
      status: 'verified',
      date: '2025-09-15',
      owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    },
    {
      id: 2,
      tokenId: 'BCT-002',
      project: 'Seagrass Project B',
      amount: '3,200',
      status: 'pending',
      date: '2025-09-18',
      owner: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    }
  ]);

  const [projects] = useState([
    {
      id: 1,
      name: 'Mangrove Project A',
      verifiedCredits: '15,000',
      availableToMint: '7,000',
      location: 'Indonesia'
    },
    {
      id: 2,
      name: 'Seagrass Project B',
      verifiedCredits: '8,000',
      availableToMint: '4,800',
      location: 'Philippines'
    }
  ]);

  const [transactions] = useState([
    {
      id: 1,
      type: 'mint',
      tokenId: 'BCT-001',
      amount: '8,000',
      from: '0x0000000000000000000000000000000000000000',
      to: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      date: '2025-09-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'transfer',
      tokenId: 'BCT-001',
      amount: '2,000',
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x8F3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      date: '2025-09-16',
      status: 'pending'
    }
  ]);

  const handleMintSubmit = (e) => {
    e.preventDefault();
    // Implement token minting logic here
    setShowMintModal(false);
    setMintAmount('');
    setSelectedProject('');
  };

  // Calculate statistics
  const totalTokens = tokens.reduce((acc, token) => acc + parseInt(token.amount.replace(/,/g, '')), 0);
  const verifiedTokens = tokens.filter(token => token.status === 'verified')
    .reduce((acc, token) => acc + parseInt(token.amount.replace(/,/g, '')), 0);
  const pendingTokens = totalTokens - verifiedTokens;

  // Animation classes
  const getAnimationClass = (inView) => inView ? 'animate-in' : '';

  return (
    <div className="token-container">
      <div ref={headerRef} className={`token-header ${getAnimationClass(headerInView)}`}>
        <div className="header-content">
          <h1>Carbon Credit Tokens</h1>
          <div className="token-stats">
            <div className="stat-item">
              <span className="stat-value">{totalTokens.toLocaleString()}</span>
              <span className="stat-label">Total Credits</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{verifiedTokens.toLocaleString()}</span>
              <span className="stat-label">Verified</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{pendingTokens.toLocaleString()}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </div>
        <button className="mint-btn glow-effect" onClick={() => setShowMintModal(true)}>
          <i className="fas fa-plus"></i> Mint New Tokens
        </button>
      </div>

      <div ref={tabsRef} className={`token-tabs ${getAnimationClass(tabsInView)}`}>
        <button
          className={`tab-btn ${selectedTab === 'tokens' ? 'active' : ''}`}
          onClick={() => setSelectedTab('tokens')}
        >
          <i className="fas fa-wallet"></i>
          My Tokens
          <span className="tab-badge">{tokens.length}</span>
        </button>
        <button
          className={`tab-btn ${selectedTab === 'projects' ? 'active' : ''}`}
          onClick={() => setSelectedTab('projects')}
        >
          <i className="fas fa-leaf"></i>
          Available Projects
          <span className="tab-badge">{projects.length}</span>
        </button>
        <button
          className={`tab-btn ${selectedTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setSelectedTab('transactions')}
        >
          <i className="fas fa-exchange-alt"></i>
          Transactions
          <span className="tab-badge">{transactions.length}</span>
        </button>
      </div>

      {selectedTab === 'tokens' && (
        <div ref={contentRef} className={`tokens-list ${getAnimationClass(contentInView)}`}>
          {tokens.map(token => (
            <div key={token.id} className="token-card">
              <div className="token-info">
                <div className="token-header">
                  <h3>{token.tokenId}</h3>
                  <span className={`token-status ${token.status}`}>
                    {token.status}
                  </span>
                </div>
                <p className="project-name">{token.project}</p>
                <div className="token-details">
                  <div className="detail">
                    <span className="label">Amount</span>
                    <span className="value">{token.amount} tCO2e</span>
                  </div>
                  <div className="detail">
                    <span className="label">Date</span>
                    <span className="value">{token.date}</span>
                  </div>
                </div>
              </div>
              <div className="token-actions">
                <button className="action-btn">
                  <i className="fas fa-exchange-alt"></i> Transfer
                </button>
                <button className="action-btn">
                  <i className="fas fa-file-contract"></i> Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'projects' && (
        <div ref={contentRef} className={`projects-list ${getAnimationClass(contentInView)}`}>
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-info">
                <h3>{project.name}</h3>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i> {project.location}
                </p>
                <div className="credit-stats">
                  <div className="stat">
                    <span className="label">Verified Credits</span>
                    <span className="value">{project.verifiedCredits} tCO2e</span>
                  </div>
                  <div className="stat">
                    <span className="label">Available to Mint</span>
                    <span className="value">{project.availableToMint} tCO2e</span>
                  </div>
                </div>
              </div>
              <button className="mint-btn" onClick={() => setShowMintModal(true)}>
                Mint Tokens
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedTab === 'transactions' && (
        <div ref={contentRef} className={`transactions-list ${getAnimationClass(contentInView)}`}>
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Token ID</th>
                <th>Amount</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td>
                    <span className={`tx-type ${tx.type}`}>{tx.type}</span>
                  </td>
                  <td>{tx.tokenId}</td>
                  <td>{tx.amount} tCO2e</td>
                  <td className="address">{tx.from.substring(0, 6)}...{tx.from.substring(38)}</td>
                  <td className="address">{tx.to.substring(0, 6)}...{tx.to.substring(38)}</td>
                  <td>{tx.date}</td>
                  <td>
                    <span className={`tx-status ${tx.status}`}>{tx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showMintModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Mint New Tokens</h2>
              <button className="close-btn" onClick={() => setShowMintModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleMintSubmit} className="mint-form">
              <div className="form-group">
                <label>Select Project</label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  required
                >
                  <option value="">Choose a project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} ({project.availableToMint} tCO2e available)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount (tCO2e)</label>
                <input
                  type="number"
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  placeholder="Enter amount to mint"
                  required
                  min="1"
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowMintModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="mint-submit-btn">
                  Mint Tokens
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Token;
