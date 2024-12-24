const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbMongo');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});