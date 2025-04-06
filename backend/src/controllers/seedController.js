// controllers/seedController.js
const Seed = require('../models/Seed');

const createSeed = async (req, res) => {
  try {
    const { name, type, description, compatibilities } = req.body;

    const newSeed = new Seed({
      name,
      type,
      description,
      compatibilities
    });

    await newSeed.save();
    res.status(201).json(newSeed);
  } catch (err) {
    console.error('Error creating seed:', err);
    res.status(500).json({ error: 'Failed to create seed' });
  }
};

module.exports = { createSeed };
