const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: Date.now() }));

// API routes
app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`🚀 Server running on port ${config.port}`);
});
