const express = require('express');
const router = express.Router();
const { sendXrpController, sendXlmController } = require('../controllers/paymentController');

// POST /api/send-xrp
router.post('/send-xrp', sendXrpController);

// POST /api/send-xlm
router.post('/send-xlm', sendXlmController);

module.exports = router;
