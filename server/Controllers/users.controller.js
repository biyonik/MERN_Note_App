const asyncHandler = require("express-async-handler");
const { BAD_REQUEST, OK, CREATED, NOT_FOUND } = require("http-status-codes");
const UserModel = require('../Models/user.model');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken");

const register = asyncHandler(async (requestObject, responseObject, nextFunction) => {
    const {username, email, password} = requestObject.body;
    if (!username || !email || !password) {
        responseObject.status(BAD_REQUEST);
        throw new Error('Lütfen kullanıcı adı, e-posta adresi ve parola bilgisini boş bırakmayınız!');   
    }

    const userIsExists = await UserModel.findOne({email});
    if (userIsExists) {
        responseObject.status(BAD_REQUEST);
        throw new Error('Bu e-posta adresi ile daha önce kayıt olunmuş!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
        username: username,
        email: email,
        password: hashedPassword
    });
    await newUser.save();
    responseObject.status(CREATED).json(newUser);
});

const login = asyncHandler(async (requestObject, responseObject, nextFunction) => {
    const {email, password} = requestObject.body;
    if (!email || !password) {
        responseObject.status(BAD_REQUEST);
        throw new Error('Lütfen e-posta adresi ve parola bilgisini boş bırakmayınız!');
    }

    const userIsExists = await UserModel.findOne({email});
    if (!userIsExists) {
        responseObject.status(BAD_REQUEST);
        throw new Error('Bu e-posta adresine bağlı kullanıcı bulunamadı!');
    }

    const {_id} = userIsExists;

    const passwordConfirmationStatus = await bcrypt.compare(password, userIsExists.password);
    if (passwordConfirmationStatus) {
        const token = jsonwebtoken.sign({email, _id}, requestObject.app.get('API_SECRET_KEY'), {expiresIn: 720});
        return await responseObject.status(OK).json({
            token: token,
            email: email,
            username: userIsExists.username
        });
    } else {
        responseObject.status(NOT_FOUND);
        throw new Error("E-Posta adresi veya parola hatalı!");
    }
});

const get = asyncHandler(async (requestObject, responseObject, nextFunction) => {

});

module.exports = {
    register,
    login,
    get
}