import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const sendXrp = (recipient, amount) =>
  api.post('/send-xrp', { recipient, amount });

export const sendXlm = (recipient, amount) =>
  api.post('/send-xlm', { recipient, amount });

export const fetchTransactions = () =>
  api.get('/transactions');
