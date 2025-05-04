const { sendXrp } = require('../services/xrplService');
const { sendXlm } = require('../services/stellarService');

async function sendXrpController(req, res) {
  const { recipient, amount } = req.body;
  try {
    const txHash = await sendXrp(recipient, amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function sendXlmController(req, res) {
  const { recipient, amount } = req.body;
  try {
    const txHash = await sendXlm(recipient, amount);
    res.json({ success: true, txHash });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { sendXrpController, sendXlmController };
