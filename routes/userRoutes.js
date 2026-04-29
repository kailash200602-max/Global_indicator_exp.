import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get User Profile or Create if doesn't exist
router.post('/profile', protect, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    
    let user = await User.findOne({ firebaseUID: uid });
    
    if (!user) {
      user = await User.create({
        name: name || email.split('@')[0],
        email: email,
        firebaseUID: uid,
        avatar: picture || ''
      });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
