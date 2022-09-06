
const jsonwebtoken = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const UserModel = require('../Models/user.model');
const { NOT_FOUND } = require("http-status-codes");

module.exports = asyncHandler(async (requestObject, responseObject, nextFunction) => {
    const token = requestObject.headers['x-axxess-token']
    || requestObject.body.token
    || requestObject.query.token
    || requestObject.header('Authorization')?.replace('Bearer', '').trim();

    if (token) {
        jsonwebtoken.verify(token, requestObject.app.get('API_SECRET_KEY'), async (err, decodedToken) => {
            if (err) {
                responseObject.status(NOT_FOUND);
                throw new Error("Bu token bilgisi geçersiz!");
            }
            
            requestObject.decodedToken = decodedToken;
            const {email} = decodedToken;
            requestObject.user = await UserModel.findOne({email}).select('-password');
            nextFunction();
        })
    } else {
        responseObject.status(NOT_FOUND);
        throw new Error("Hiçbir token bilgisi sağlanamadı!");
    }
});