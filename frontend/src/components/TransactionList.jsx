import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../api/paymentApi';

export function TransactionList() {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then(res => setTxs(res.data.transactions))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading transactions…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <div className="tx-list card">
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Network</th>
            <th>Recipient</th>
            <th>Amount</th>
            <th>Hash</th>
          </tr>
        </thead>
        <tbody>
          {txs.map(tx => (
            <tr key={tx.id}>
              <td>{new Date(tx.created_at).toLocaleString()}</td>
              <td className={tx.network}>{tx.network.toUpperCase()}</td>
              <td>{tx.recipient}</td>
              <td>{tx.amount}</td>
              <td>
                <a
                  href={
                    tx.network === 'xrpl'
                      ? `https://testnet.xrpl.org/transactions/${tx.tx_hash}`
                      : `https://stellar.expert/explorer/testnet/tx/${tx.tx_hash}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tx.tx_hash.slice(0, 8)}…
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
