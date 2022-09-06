const express = require('express');
const router = express.Router();
const {login, register, get} = require('../Controllers/users.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/get', get);


module.exports = router;