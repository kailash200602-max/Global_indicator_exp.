import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  countries: [{ type: String }],
  indicators: [{ type: String }],
  dashboards: [{
    name: String,
    countries: [String],
    indicators: [String],
    createdAt: { type: Date, default: Date.now }
  }]
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
