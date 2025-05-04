import React, { useState } from 'react';
import { sendXlm } from '../api/paymentApi';
import { FaPaperPlane } from 'react-icons/fa';

export function SendXlmForm() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending…');
    try {
      const { data } = await sendXlm(recipient, amount);
      setStatus(`✅ Success: ${data.txHash}`);
    } catch (err) {
      setStatus(`❌ ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <FaPaperPlane className="card-icon" />
        <h2>Send XLM</h2>
      </div>
      <form onSubmit={handleSubmit} className="card-form">
        <label>
          Recipient Address
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="GCP…"
            required
          />
        </label>
        <label>
          Amount (XLM)
          <input
            type="number"
            step="0.000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="5"
            required
          />
        </label>
        <button type="submit" className="btn btn-secondary">
          Send XLM
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
