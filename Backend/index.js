const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


// MongoDB connection
mongoose.connect('mongodb://localhost/artisandb', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

  // Define routes
const authRoutes = require('./Routes/auth');
app.use('/api/auth', authRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});