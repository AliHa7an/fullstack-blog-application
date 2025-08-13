const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3020;

app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/SampleBlogs'
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/users', require('./routes/users'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
