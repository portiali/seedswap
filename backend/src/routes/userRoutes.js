// routes/seedRoutes.js
const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const { getUser } = require('../controllers/userController');


// POST /api/users
console.log(createUser);  // This should log a function definition
router.post('/', createUser);

router.get('/', getUser);

// router.post('/', createUser);

module.exports = router;
