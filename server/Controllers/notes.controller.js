const {OK, NOT_FOUND, BAD_REQUEST} = require("http-status-codes");
const asyncHandler = require("express-async-handler");

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
    if (!requestObject.body.message) {
        throw new Error('Lütfen mesaj bilgisi gönderiniz!');
    }
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
