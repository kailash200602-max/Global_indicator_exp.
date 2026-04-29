import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// Get user's favorites
router.get('/', protect, async (req, res) => {
  try {
    let favorites = await Favorite.findOne({ userId: req.user.uid });
    if (!favorites) {
      favorites = await Favorite.create({ userId: req.user.uid, countries: [], indicators: [], dashboards: [] });
    }
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

// Update favorites
router.put('/', protect, async (req, res) => {
  const { countries, indicators } = req.body;
  try {
    const favorites = await Favorite.findOneAndUpdate(
      { userId: req.user.uid },
      { countries, indicators },
      { new: true, upsert: true }
    );
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorites' });
  }
});

export default router;
