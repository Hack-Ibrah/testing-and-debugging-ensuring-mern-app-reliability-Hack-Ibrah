const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-bug-tracker';

// Connect to MongoDB (optional — you can run without a DB for tests that mock)
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  }).catch(err => {
    console.error('Mongo connection error (you can still run tests with mocked DB):', err.message);
    // Start server anyway for local dev without DB
    app.listen(PORT, () => console.log('Server running on port', PORT));
  });
