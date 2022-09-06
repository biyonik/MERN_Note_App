const {OK} = require("http-status-codes");
const express = require('express');
const router = express.Router();
const userControl = require('../Middlewares/auth.middleware');

const {
    getAll,
    getById,
    add,
    update,
    remove
} = require('../Controllers/notes.controller');

router.route('/')
    .get(userControl, getAll)
    .post(userControl, add);

router.route('/:id')
    .get(userControl, getById)
    .put(userControl ,update)
    .delete(userControl ,remove);

module.exports = router;
