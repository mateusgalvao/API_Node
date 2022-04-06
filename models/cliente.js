const mongoose = require('mongoose');

const cliente = mongoose.model("cliente", {
    id : Object,
    tags : String,
    id_filial : String,
    nome : String,
    fantasia : String,
    cliente : Boolean,
    prospect : Boolean,
    cpf_cnpj : String,
    
});

module.exports = cliente;