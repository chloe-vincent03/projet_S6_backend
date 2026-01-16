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
      inkLayer: "https://res.cloudinary.com/dveki8qer/image/upload/v1768563540/boulangerie_black_jeesiq.png",
      watercolorLayer: "https://res.cloudinary.com/dveki8qer/image/upload/v1768563540/boulangerie_kbjcrp.jpg"
    });
    await Place.create({
      title: "Le Passage des Glycines",
      order: 2,
      description: "Un tunnel végétal où les fleurs tombent en cascades violettes et roses. Ici, le pavé disparaît sous les pétales et l'air embaume le miel. C'est le raccourci préféré de ceux qui ne sont pas pressés.",
      watercolorLayer: "https://res.cloudinary.com/dveki8qer/image/upload/v1768567917/rue_mtekyd.jpg",
    });

    console.log("✅ La ville commence à prendre vie ! (Boulangerie ajoutée)");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Erreur de seed :", err);
  }
};

seedDatabase();