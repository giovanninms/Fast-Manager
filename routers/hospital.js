const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/HospitalSchema")
const HospitalSchema = mongoose.model("hospitais")

router.get("/", (req, res) => {
    res.render("hospital/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nomeFantasia") {
        HospitalSchema.findOne({nomeFantasia: inputFiltro}).lean().then((hospital) => {
            console.log(`Hospital ${hospital.nomeFantasia},`)
            res.render("hospital/filtro", {hospital: hospital})
        }).catch((error) => {
            console.log("Erro ao consultar o hospital pelo nome fantasia: " + error)
        })
    }else if(selectFiltro === "cnpj"){
        HospitalSchema.findOne({cnpj: inputFiltro}).then((hospital) => {
            console.log(`Hospital ${hospital.nomeFantasia},`)
            res.render("hospital/filtro", {hospital: hospital})
        }).catch((error) => {
            console.log("Erro ao consultar o hospital pelo cnpj: " + error)
        })
    }else if(selectFiltro === "todos"){
        HospitalSchema.find().lean().then((hospitais) => {
            hospitais.forEach(hospital => {
                console.log(`Hospital: ${hospital.nomeFantasia}`)
    
            });
            res.render("hospital/index", { hospitais: hospitais })
        }).catch((error) => {
            console.log("Error ao consultar todos os hospitais: " + error)
        })
    }
    
})

// //CRUD do hospital
//     //Create
// const novoHospital = ({
//     razaoSocial: "UNIORT.E - ORTOPEDIA ESPECIALIZADA LTDA",
//     nomeFantasia: "CENTRO DE ORTOPEDIA UNIORTE",
//     cnpj: "10.246.214/0001-04",
//     email: "uniorte@email.com",
//     telefone: "(43) 3377-0900",
//     celular: "(43) 93377-0900",
//     endereco: [{
//         rua: "AVENIDA HIGIENOPOLIS, 2600",
//         bairro: "PARQUE GUANABARA",
//         cidade: "Londrina",
//         cep: "86.050-000"
//     }]
// })
// new HospitalSchema(novoHospital).save().then(() => {
//     console.log("Hospital cadastrado com sucesso!")
//     //req.flash("msg_sucesso", "Hospital cadastrado com sucesso!")
//     //res.render("index")
// }).catch((error) => {
//     console.log("Erro ao cadastrar hospital: " + error)
//     //req.flash("msg_erro", "Erro ao cadastrar Hospital")
//     //res.render("index")
// })
//     //Read
//         
//         //consulta de todos os hospitais
//
//Update
// const updateHospital =({
//     nomeFantasia: "Teste"
// })
// HospitalSchema.findOne({_id: "663bac4a2f182db2b3275f9a"}, updateHospital).then((hospital)=>{
//     console.log(`razão Socail ${hospital.nomeFantasia} alterado para ${updateHospital.nomeFantasia}`)
// }).catch((error)=>{
//     console.log("Erro ao editar hospital")
// })
//Delete
// HospitalSchema.findOneAndDelete({_id: "6634e3f01861ef23a77dbcd8"}).then((hospital)=>{
//     console.log(`Hospital ${hospital.nomeFantasia} deletado`)
// }).catch((error)=>{
//     console.log("Erro ao deletar hospital")
// })

module.exports = router