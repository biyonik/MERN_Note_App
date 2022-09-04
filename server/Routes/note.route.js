const {OK} = require("http-status-codes");
const express = require('express');
const router = express.Router();
const {
    getAll,
    getById,
    add,
    update,
    remove
} = require('../Controllers/notes.controller');

router.route('/')
    .get(getAll)
    .post(add);

router.route('/:id')
    .get(getById)
    .put(update)
    .delete(remove);

module.exports = router;
