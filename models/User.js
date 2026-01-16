const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progress: [{ // Pour stocker les IDs des lieux déjà visités/coloriés
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    isCompleted: { type: Boolean, default: false }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Avant de sauvegarder, on crypte le mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);