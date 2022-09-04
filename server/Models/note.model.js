const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = Schema({
    title: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz!'],
        maxlength: [64, '{PATH} alanı maksimum {MAXLENGTH} karakter uzunluğunda olabilir!'],
        minlength: [2, '{PATH} alanı minimum {MINLENGTH} karakter uzunluğunda olmalıdır!'],
    },
    description: {
        type: String,
        required: [true, '{PATH} alanı boş bırakılamaz!'],
        maxlength: [512, '{PATH} alanı maksimum {MAXLENGTH} karakter uzunluğunda olabilir!'],
        minlength: [2, '{PATH} alanı minimum {MINLENGTH} karakter uzunluğunda olmalıdır!']
    },
    priority: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const NoteModel = mongoose.model('Note', NoteSchema);
module.exports = NoteModel;
