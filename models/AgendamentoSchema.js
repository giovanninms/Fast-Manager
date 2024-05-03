const mongoose = require("mongoose")
const schema = mongoose.Schema

const agendamentoSchema = new schema({
    paciente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "pacientes",
        requered: true
    },
    medico:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicos",
        requred: true
    }, 
    hospital:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospitais",
        requered: true
    }, 
    
})