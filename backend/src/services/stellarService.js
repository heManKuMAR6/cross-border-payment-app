// File: backend/src/services/stellarService.js

const { Server, Keypair, Networks, TransactionBuilder, Operation, Asset } = require('stellar-sdk');
const { stellarConfig } = require('../config');

// Initialize connection to Horizon Testnet
const server = new Server(stellarConfig.horizonURL);
// Load our test account keypair
const sourceKeypair = Keypair.fromSecret(stellarConfig.secretKey);

/**
 * Send XLM payment on Stellar Testnet
 * @param {string} recipient - Stellar public key of the recipient
 * @param {number|string} amount - amount of XLM to send
 * @returns {Promise<string>} - transaction hash
 */
async function sendXlm(recipient, amount) {
  // Load the source account details
  const account = await server.loadAccount(sourceKeypair.publicKey());
  // Fetch the current base fee
  const fee = await server.fetchBaseFee();

  // Build the payment transaction
  const transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(Operation.payment({
      destination: recipient,
      asset: Asset.native(),
      amount: amount.toString(),
    }))
    .setTimeout(30)
    .build();

  // Sign the transaction
  transaction.sign(sourceKeypair);

  // Submit the transaction to the network
  const response = await server.submitTransaction(transaction);
  return response.hash;
}

module.exports = { sendXlm };