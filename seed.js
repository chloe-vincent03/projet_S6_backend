const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4 // Force l'utilisation de l'IPv4
    });
    
    // On nettoie la base pour éviter les doublons
    await Place.deleteMany();

    // On ajoute ta première étape
    await Place.create({
      title: "La Boulangerie du Vieux Pavé",
      order: 1,
      description: "Une odeur de pain chaud flotte dans l'air matinal. Ici, le temps s'arrête le temps d'une fournée.",
      inkLayer: "https://url-de-ton-image-en-noir-et-blanc.png",
      watercolorLayer: "https://url-de-ton-image-aquarelle.png"
    });

    console.log("✅ La ville commence à prendre vie ! (Boulangerie ajoutée)");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Erreur de seed :", err);
  }
};

seedDatabase();