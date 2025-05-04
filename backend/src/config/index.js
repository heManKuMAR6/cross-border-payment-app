// Load .env into process.env
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,

  xrplConfig: {
    network: process.env.XRPL_NETWORK,
    seed: process.env.XRP_WALLET_SEED,
  },

  stellarConfig: {
    horizonURL: process.env.STELLAR_HORIZON_URL,
    secretKey: process.env.STELLAR_SECRET_KEY,
  },
};
