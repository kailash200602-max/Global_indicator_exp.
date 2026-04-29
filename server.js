import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

import userRoutes from './routes/userRoutes.js';
import worldbankRoutes from './routes/worldbankRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/worldbank', worldbankRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/chat', chatRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Global Indicator Explorer API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
