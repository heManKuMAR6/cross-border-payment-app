import React from 'react';
import { SendXrpForm } from '../components/SendXrpForm';
import { SendXlmForm } from '../components/SendXlmForm';
import { TransactionList } from '../components/TransactionList';
import { FaRocket } from 'react-icons/fa';

export function Home() {
  return (
    <div className="app-container">
      <header className="app-header">
        <FaRocket className="header-icon" />
        <h1>Cross‑Border Payment Demo</h1>
      </header>

      <main>
        <div className="forms">
          <SendXrpForm />
          <SendXlmForm />
        </div>
        <TransactionList />
      </main>

      <footer className="app-footer">
        &copy; 2025 Cross‑Border Payments Demo
      </footer>
    </div>
  );
}
