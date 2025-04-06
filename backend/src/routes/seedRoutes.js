// routes/seedRoutes.js
const express = require('express');
const router = express.Router();
const { createSeed } = require('../controllers/seedController');

// POST /api/seeds
router.post('/', createSeed);

module.exports = router;
