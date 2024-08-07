const mongoose = require("mongoose")
const schema = mongoose.Schema

const pacienteSchema = new schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    rg: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date
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

mongoose.model("pacientes", pacienteSchema)