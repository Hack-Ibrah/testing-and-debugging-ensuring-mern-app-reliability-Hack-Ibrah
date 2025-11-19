const express = require('express');
const cors = require('cors');
const bugsRouter = require('./routes/bugs');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/bugs', bugsRouter);

// error handler middleware (centralized)
app.use((err, req, res, next) => {
  console.error('Error middleware:', err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

module.exports = app;
