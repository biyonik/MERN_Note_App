const {OK, NOT_FOUND, BAD_REQUEST, CREATED} = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const noteModel = require('../Models/note.model');
const userModel = require('../Models/user.model');

/**
 * Tüm notları getirir
 * @param requestObject
 * @param responseObject
 */
const getAll = asyncHandler(async (requestObject, responseObject) => {
    const notes = await noteModel.find({user: requestObject.user._id});
    return await notes.count
        ? responseObject.status(OK).json(notes)
        : responseObject.status(NOT_FOUND).json();
});

/**
 * id parametresine denk gelen bir not getirir
 * @param requestObject
 * @param responseObject
 */
const getById = asyncHandler(async (requestObject, responseObject) => {
    const {id} = requestObject.params;
    if (!id) {
        responseObject.status(NOT_FOUND);
        throw new Error('Geçerli bir id değeri göndermediniz!');
    }
    const note = await noteModel.find({_id: id, user: requestObject.user._id});
    return await note
        ? responseObject.status(OK).json(note)
        : responseObject.status(NOT_FOUND).json();
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
        priority: priority,
        user: requestObject.user._id
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
    const {id} = requestObject.params;
    const note = await noteModel.findById(id);
    const user = await userModel.findById(requestObject.user._id);
    
    if (!user) {
        responseObject.status(NOT_FOUND);
        throw new Error('Böyle bir kullanıcı bulunamadı!');
    }

    if (!note) {
        responseObject.status(NOT_FOUND);
        throw new Error('Böyle bir not bulunamadı!');
    }

    if (note.user.toString() !== user._id) {
        responseObject.status(UNAUTHORIZED);
        throw new Error('Kullanıcı yetkili değil!');
    }

    const updatedNote = await noteModel.findByIdAndUpdate(id, requestObject.body, {new: true});
    return await updatedNote
        ? responseObject.status(OK).json(updatedNote)
        : responseObject.status(BAD_REQUEST).json();
});

/**
 * Bir not siler
 * @param requestObject
 * @param responseObject
 */
const remove = asyncHandler(async (requestObject, responseObject) => {
    const {id} = requestObject.params;
    const note = await noteModel.findById(id);
    const user = await userModel.findById(requestObject.user._id);
    
    if (!user) {
        responseObject.status(NOT_FOUND);
        throw new Error('Böyle bir kullanıcı bulunamadı!');
    }

    if (!note) {
        responseObject.status(NOT_FOUND);
        throw new Error('Böyle bir not bulunamadı!');
    }

    if (note.user.toString() !== user._id) {
        responseObject.status(UNAUTHORIZED);
        throw new Error('Kullanıcı yetkili değil!');
    }

    await note.remove();
    return responseObject.status(OK).json();
});

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}
