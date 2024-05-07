const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/PacienteSchema")
const PacienteSchema = mongoose.model("pacientes")

//CRUD dos pacientes
    //Create
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

    //Read
        //Consulta de um paciente
PacienteSchema.findOne({_id: ""}).then((paciente)=>{
    console.log(`Consulta do paciente: ${paciente.nome}`)
}).catch((error)=>{
    console.log("Erro ao consultar um paciente! " + error)
})
        //Consulta de todos paciente
PacienteSchema.find().lean().then((pacientes)=>{
    pacientes.forEach(paciente => {
        console.log(`Paciente: ${paciente.nome}`)
    });
}).catch((error)=>{
    console.log("Erro ao consultar todos os usuarios!")
})

    //Update
const updatePaciente = ({
    nome: "Mayllon"
})

PacienteSchema.findOneAndUpdate({_id: ""}, updatePaciente).then(()=>{
    console.log(`Paciente: ${updatePaciente.nome} atualizado com sucesso!`)
}).catch((error)=>{
    console.log("Erro atualizado paciente")
})
    //Delete
PacienteSchema.findOneAndDelete({_id: ""}).then((paciente)=>{
    console.log(`Paciente ${paciente.nome} deletado!`)
}).catch((error)=>{
    console.log("Erro ao deletar paciente!")
})


module.exports = router