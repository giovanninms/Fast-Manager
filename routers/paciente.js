const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/PacienteSchema")
const PacienteSchema = mongoose.model("pacientes")

//CRUD dos pacientes
const novoPaciente = ({
    nome: "Giovanni Nascimento",
    cpf: "130.069.739-33",
    rg: "12.49.702-9",
    dataNascimento: "2002-04-06",
    email: "nascimento.giovanni99@gmail.com",
    telefone: "(43) 3321-7855",
    celular: "(43) 98860-880",
    endereco: [{
        rua: "Perdizes, 166",
        bairro: "Paraiso",
        cidade: "Londrina",
        cep: "86.078-260"
    }]
})
new PacienteSchema(novoPaciente).save().then(() => {
    console.log("Paciente cadastrado com sucesso!")
    req.flash("msg_sucesso", "Paciente cadastrado com sucesso!"),
        res.render("index")
}).catch((error) => {
    console.log("Erro ao cadastrar paciente! " + error)
    req.flash("msg_erro", "Erro ao cadastrar paciente!")
    res.render("index")
})

module.exports = router