const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz'],
        maxlength: [32, '{PATH} alanı maksimum {MAXLENGTH} karakter uzunluğunda olabilir!'],
        minlength: [4, '{PATH} alanı minimum {MINLENGTH} karakter uzunluğunda olmalıdır!'],
        unique: [true, '{PATH} alanı benzersiz olmalıdır. Bu kullanıcı adı kullanılmakta!']
    },
    email: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz!'],
        unique: [true, '{PATH} alanı benzersiz olmalıdır. Bu e-posta adresi kullanılmakta!']
    },
    password: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz!']
    },
    hashedPassword: {
        type: String
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;