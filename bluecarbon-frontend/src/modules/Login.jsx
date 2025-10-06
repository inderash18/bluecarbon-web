import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [account, setAccount] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Unique demo accounts with realistic account numbers and PINs
  const demoAccounts = {
    '6102948371': '1948',
    '7283059162': '3057',
    '8436172095': '4621',
    '9254703681': '5709',
    '1068374925': '6834'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!account || !pin) {
      setError('Please enter account number and PIN');
      return;
    }

    const expected = demoAccounts[account];
    if (!expected) {
      setError('Unknown account number');
      return;
    }
    if (expected !== pin) {
      setError('Incorrect PIN');
      return;
    }

    // Success: set simple auth token in localStorage and navigate to dashboard
    try {
      localStorage.setItem('bc_auth', account);
    } catch (err) {
      // ignore storage errors
    }
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card" role="main" aria-labelledby="login-title">
        <div className="brand">
          <div className="logo">BC</div>
          <h1 id="login-title">BlueCarbon</h1>
          <p className="tag">Manage carbon credits securely</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="account">Account Number</label>
            <input
              id="account"
              type="text"
              inputMode="numeric"
              value={account}
              onChange={(e) => setAccount(e.target.value.trim())}
              placeholder="Enter account number"
              autoComplete="username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="pin">PIN</label>
            <input
              id="pin"
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              inputMode="numeric"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error">{error}</div>}

          <div className="actions">
            <button className="btn primary" type="submit">Sign in</button>
          </div>

          <div className="links">
            <a href="#">Forgot PIN?</a>
          </div>
        </form>
      </div>

      <div className="animated-bg" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
    </div>
  );
}