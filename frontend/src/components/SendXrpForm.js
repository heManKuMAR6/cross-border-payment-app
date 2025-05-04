import React, { useState } from 'react';
import { sendXrp } from '../api/paymentApi';
import { FaCoins } from 'react-icons/fa';

export function SendXrpForm() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending…');
    try {
      const { data } = await sendXrp(recipient, amount);
      setStatus(`✅ Success: ${data.txHash}`);
    } catch (err) {
      setStatus(`❌ ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <FaCoins className="card-icon" />
        <h2>Send XRP</h2>
      </div>
      <form onSubmit={handleSubmit} className="card-form">
        <label>
          Recipient Address
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="rPT1Sjq2Y…"
            required
          />
        </label>
        <label>
          Amount (XRP)
          <input
            type="number"
            step="0.000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10"
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Send XRP
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
