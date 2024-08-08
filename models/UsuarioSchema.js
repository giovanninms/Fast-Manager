const mongoose = require("mongoose")
const schema = mongoose.Schema

const niveisUsuario = Object.freeze({
    Adm: "ADM", 
    Agendamento: "Agendamento",
    SupervisorEstoque: "Supervisor do Estoque",
    Separacao: "Separação"
})

const usuarioSchema = new schema({
    nick:{
        type: String,
        required: true
    },
    nome:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    senha:{
        type: String,
        required:true
    },
    nivelUsuario:{
        type: String,
        enum: Object.values(niveisUsuario)
    }
})

Object.assign(usuarioSchema.statics, {niveisUsuario})

mongoose.model("usuarios", usuarioSchema)