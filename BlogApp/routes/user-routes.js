const express = require('express');
const { getAlluser, signup, login} = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getAlluser);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
