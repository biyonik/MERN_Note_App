const {OK} = require("http-status-codes");

/**
 * Tüm notları getirir
 * @param requestObject
 * @param responseObject
 */
const getAll = (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: 'GET ALL NOTES'});
}

/**
 * id parametresine denk gelen bir not getirir
 * @param requestObject
 * @param responseObject
 */
const getById = (requestObject, responseObject) => {
    responseObject
        .status(OK)
        .json({message: `GET BY ID NOTE FROM ${requestObject.params.id}`});
}

/**
 * Bir not ekler
 * @param requestObject
 * @param responseObject
 */
const add = (requestObject, responseObject) => {

}

/**
 * Bir not günceller
 * @param requestObject
 * @param responseObject
 */
const update = (requestObject, responseObject) => {

}

/**
 * Bir not siler
 * @param requestObject
 * @param responseObject
 */
const remove = (requestObject, responseObject) => {

}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}
