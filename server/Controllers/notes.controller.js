const {OK, NOT_FOUND, BAD_REQUEST, CREATED} = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const noteModel = require('../Models/note.model');
/**
 * Tüm notları getirir
 * @param requestObject
 * @param responseObject
 */
const getAll = asyncHandler(async (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: 'GET ALL NOTES'});
});

/**
 * id parametresine denk gelen bir not getirir
 * @param requestObject
 * @param responseObject
 */
const getById = asyncHandler(async (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: `GET BY ID NOTE FROM ${requestObject.params.id}`});
});

/**
 * Bir not ekler
 * @param requestObject
 * @param responseObject
 */
const add = asyncHandler(async (requestObject, responseObject) => {
    const {title, description, priority} = requestObject.body;
    if (!title || !description) {
        responseObject.status(BAD_REQUEST);
        throw new Error('Lütfen başlık ve açıklama alanlarını doldurunuz!');
    }
    const note = await noteModel.create({
        title: title,
        description: description,
        priority: priority
    });

    return await responseObject
        .status(CREATED)
        .json(note);
});

/**
 * Bir not günceller
 * @param requestObject
 * @param responseObject
 */
const update = asyncHandler(async (requestObject, responseObject) => {

});

/**
 * Bir not siler
 * @param requestObject
 * @param responseObject
 */
const remove = asyncHandler(async (requestObject, responseObject) => {

});

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}
