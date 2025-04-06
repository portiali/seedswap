// routes/seedRoutes.js
const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userController');

// POST /api/users
console.log(createUser);  // This should log a function definition
router.post('/', createUser);

router.post('/login', loginUser)

// router.post('/', createUser);

module.exports = router;
