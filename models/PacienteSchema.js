const mongoose = require("mongoose")
const schema = mongoose.Schema

const pacienteSchema = ({
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
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telone: {
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