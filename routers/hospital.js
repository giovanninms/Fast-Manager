const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/HospitalSchema")
const HospitalSchema = mongoose.model("hospitais")

//CRUD do hospital
const novoHospital = ({
    razaoSocial: "UNIORT.E - ORTOPEDIA ESPECIALIZADA LTDA",
    nomeFantasia: "CENTRO DE ORTOPEDIA UNIORTE",
    cnpj: "10.246.214/0001-04",
    email: "uniorte@email.com",
    telefone: "(43) 3377-0900",
    celular: "(43) 93377-0900",
    endereco: [{
        rua: "AVENIDA HIGIENOPOLIS, 2600",
        bairro: "PARQUE GUANABARA",
        cidade: "Londrina",
        cep: "86.050-000"
    }]
})
new HospitalSchema(novoHospital).save().then(() => {
    console.log("Hospital cadastrado com sucesso!")
    req.flash("msg_sucesso", "Hospital cadastrado com sucesso!")
    res.render("index")
}).catch((error) => {
    console.log("Erro ao cadastrar hospital: " + error)
    req.flash("msg_erro", "Erro ao cadastrar Hospital")
    res.render("index")
})

module.exports = router