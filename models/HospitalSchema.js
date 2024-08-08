const mongoose = require("mongoose")
const schema = mongoose.Schema

const hospitalSchema = new schema({
    razaoSocial: {
        type: String,
        required: true
    },
    nomeFantasia: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String
    },
    celular: {
        type: String,
        required: true
    },
    endereco: [{
        rua: String,
        bairro: String,
        cidade: String,
        cep: String,
    }],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }

})

mongoose.model("hospitais", hospitalSchema)