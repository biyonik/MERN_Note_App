const express = require('express');
const router = express.Router();
const {login, register, get} = require('../Controllers/users.controller');
const userControl = require('../Middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.get('/get', userControl, get);


module.exports = router;