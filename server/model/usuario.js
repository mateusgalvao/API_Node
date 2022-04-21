const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    nome:String,
    email: String,
    senha: String,
})

const Usuario = mongoose.model('Usuario', schema);

module.exports = Usuario;
