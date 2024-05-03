const mongoose = require("mongoose");
const schema = mongoose.Schema

const especializacoes = Object.freeze({
    Joelho: "Joelho",
    Quadril: "Quadril",
    Ombro: "Ombro",
    Tornozelo: "Tornozelo", 
    Trauma: "Trauma"
})
const medicoSchema = new schema({
    nome:{
        type: String,
        required: true
    }, 
    cpf:{
        type: String, 
        required: true
    }, 
    crm:{
        type: String,
        required: true
    }, 
    dataNascimento:{
        type: Date,
        required: true
    }, 
    especializacao:{
        type: String,
        enum: Object.values(especializacoes)
  },
    createdAt: {
        type: Date, 
        default: () => Date.now(),
        immutable: true
    }, 
    updateAt:{
        type: Date,
        default: Date.now()
    }
})

Object.assign(medicoSchema.statics,{
    especializacoes
})

mongoose.model("medicos", medicoSchema)