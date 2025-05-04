const express = require('express');
const router = express.Router();
const paymentRoutes = require('./payment');

router.use('/', paymentRoutes);

module.exports = router;
