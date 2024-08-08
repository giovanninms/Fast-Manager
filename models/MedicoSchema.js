const mongoose = require("mongoose");
const schema = mongoose.Schema

const especializacoes = Object.freeze({
    Joelho: "JOELHO",
    Quadril: "QUADRIL",
    Ombro: "OMBRO",
    Tornozelo: "TORNOZELO",
    Trauma: "TRAUMA"
})
const medicoSchema = new schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    crm: {
        type: String,
        required: true
    },
    especializacao: {
        type: String,
        enum: Object.values(especializacoes)
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
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

Object.assign(medicoSchema.statics, {
    especializacoes
})

mongoose.model("medicos", medicoSchema)