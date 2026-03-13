const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'] }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

const courseRoutes = require('./Routes/courseRoutes');
app.use('/api/courses', courseRoutes);

app.get('/test', (req, res) => res.json({ message: 'server works' }));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});