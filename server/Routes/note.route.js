const {OK} = require("http-status-codes");
const express = require('express');
const router = express.Router();

router.get('/', function (requestObject, responseObject) {
    responseObject
        .status(OK)
        .json({message: 'GET ALL NOTES'});
});

router.get('/:id', (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: `GET BY ID NOTE FROM ${requestObject.params.id}`});
})

router.post('/', (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: 'POST NOTE'});
});

router.put('/:id', (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: `PUT NOTE FROM ${requestObject.params.id}`});
});

router.delete('/:id', (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: `DELETE NOTE FROM ${requestObject.params.id}`});
})

module.exports = router;
