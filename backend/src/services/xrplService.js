const xrpl = require('xrpl');
const { xrplConfig } = require('../config');

async function sendXrp(recipient, amount) {
  const client = new xrpl.Client(xrplConfig.network);
  await client.connect();
  try {
    const wallet = xrpl.Wallet.fromSeed(xrplConfig.seed);
    const payment = {
      TransactionType: 'Payment',
      Account: wallet.classicAddress,
      Destination: recipient,
      Amount: xrpl.xrpToDrops(amount),
    };
    const prepared = await client.autofill(payment);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    return result.result.hash;
  } finally {
    client.disconnect();
  }
}

module.exports = { sendXrp };
