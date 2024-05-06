const mongoose = require("mongoose")
const schema = mongoose.Schema

const itemSchema = new schema({
    codigo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        requred: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model("itens", itemSchema)