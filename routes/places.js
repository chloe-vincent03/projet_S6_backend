const express = require('express');
const router = express.Router();
const Place = require('../models/Place');
const auth = require('../middleware/auth');

// 1. RÉCUPÉRER tous les lieux (Triés par l'ordre du scroll)
// GET http://localhost:3001/api/places
router.get('/', async (req, res) => {
  try {
    const places = await Place.find().sort('order');
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération : " + err.message });
  }
});

// 2. RÉCUPÉRER un seul lieu par son ID
// GET http://localhost:3001/api/places/:id
router.get('/:id', async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Lieu non trouvé" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. CRÉER un nouveau lieu
// POST http://localhost:3001/api/places
router.post('/', auth, async (req, res) => {
  const place = new Place({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    inkLayer: req.body.inkLayer,
    watercolorLayer: req.body.watercolorLayer,
    audioUrl: req.body.audioUrl
  });

  try {
    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (err) {
    res.status(400).json({ message: "Impossible de créer le lieu : " + err.message });
  }
});

// 4. METTRE À JOUR un lieu (ex: changer la description)
// PATCH http://localhost:3001/api/places/:id
router.patch('/:id', auth, async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlace);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. SUPPRIMER un lieu
// DELETE http://localhost:3001/api/places/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.json({ message: "Lieu supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;