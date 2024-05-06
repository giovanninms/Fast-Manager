const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/MedicoSchema")
const MedicoSchema = mongoose.model("medicos")

//CRUD dos medicos
//Create
const novoMedico = ({
    nome: "Giovanni Nascimento",
    cpf: "130.069.739.33",
    crm: "654321/PR",
    dataNascimento: "2002-04-06",
    especializacao: "Quadril",
    email: "nascimento.giovanni99@gmail.com",
    telefone: "(43) 3321-7855",
    celular: "(43) 98860-880",
})
new MedicoSchema(novoMedico).save().then(() => {
    console.log("Médico cadastrado com sucesso! ")
    req.flash("msg_sucesso", "Médico cadastrado com Sucesso!")
    res.render("index")
}).catch((error) => {
    console.log("Erro ao cadastrar médico " + error)
    req.flash("msg_erro", "Erro oo cadastrar médico!")
    res.render("index")
})

//Read
//Consulta um medico
MedicoSchema.findOne().then((medico) => {
    console.log(`Consulta de um Médico: Dr. ${medico.nome}, Especialização: ${medico.especializacao}`)
}).catch((error) => {
    console.log("não foi possivel consultar um medico! " + error)
})
//consulta de todos medicos
MedicoSchema.find().lean().then((medicos) => {
    medicos.forEach(medico => {
        console.log(`Consulta de todos medicos: Dr. ${medico.nome}`)
    });
}).catch((error) => {
    console.log("Erro ao consultar todos os medicos: " + error)
})

//Update
//edição de um medico
const updateMedico = ({
    nome: "Novo"
})
MedicoSchema.findOneAndUpdate({ _id: "6634ca6d09303f61422faf05" }, updateMedico).then((medico) => {

    console.log(`Medico: ${updateMedico.nome}, atualizado com sucesso!`)
}).catch((error) => {
    console.log("Erro ao atualizar medico! " + error)
})

//Delete
//Exclusao medico pelo _id
MedicoSchema.findOneAndDelete({ _id: "6634c927d0dc4db9d91a6bba" }).then((medico) => {
    console.log(`Medico ${medico.nome} deletado`)
}).catch((error) => {
    console.log("Erro ao deletar medico! " + error)
})

module.exports = router