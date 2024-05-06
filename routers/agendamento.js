const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/AgendamentoSchema")
const AgendamentoSchema = mongoose.model("agendamentos")

//CRUD do Agendamento
const novoAgendamento = ({
    paciente: '6634d89147281dbc185ea3e4',
    medico: '6634c927d0dc4db9d91a6bba',
    hospital: '6634e3f01861ef23a77dbcd8',
    dataCirurgia: '2024-05-06 13:00:00',
    tipoCirurgia: "Instabilidade",
    itensSolicitados: [
        { idItem: "66353558a0f364fe2995d866", quantidade: 10 }
    ]
})

AgendamentoSchema(novoAgendamento).save().then(() => {
    console.log("Agendamento cadastrado com sucesso!")
    req.flash("msg_sucesso", "Agendamento cadastrado!")
    res.render("index")
}).catch((error) => {
    console.log("Erro ao cadastrar agendamento: " + error)
    req.flash("msg_erro", "Erro ao cadastrar agendamento!")
    res.render("index")
})

module.exports = router