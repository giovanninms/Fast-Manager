const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/HospitalSchema")
const HospitalSchema = mongoose.model("hospitais")

router.get("/", (req, res) => {
    res.render("hospital/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro.toUpperCase()
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nomeFantasia") {
        HospitalSchema.find({ nomeFantasia: {$regex: inputFiltro} }).lean().then((hospitais) => {
            if (!hospitais || hospitais.length === 0 ) {
                console.log("hospital não encontrado ou hospitais.length === 0!")
                res.redirect("/hospital/")
            }else if (hospitais.length > 1) {
                console.log(`hospital ${hospitais.codigo},`)
                res.render("hospital/index", { hospitais: hospitais })
            } else if (hospitais.length == 1) {
                console.log(`hospital ${hospitais[0].codigo},`)
                res.render("hospital/filtro", { hospital: hospitais[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o hospital pelo nome fantasia: " + error)
            res.render("hospital/index")
        })
    } else if (selectFiltro === "cnpj") {
        HospitalSchema.find({ cnpj: {$regex: inputFiltro} }).lean().then((hospitais) => {
            if (!hospitais || hospitais.length === 0 ) {
                console.log("hospital não encontrado ou hospitais.length === 0!")
                res.redirect("/hospital/")
            }else if (hospitais.length > 1) {
                console.log(`hospital ${hospitais.codigo},`)
                res.render("hospital/index", { hospitais: hospitais })
            } else if (hospitais.length == 1) {
                console.log(`hospital ${hospitais[0].codigo},`)
                res.render("hospital/filtro", { hospital: hospitais[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o hospital pelo cnpj: " + error)
            res.render("hospital/index")
        })
    } else if (selectFiltro === "todos") {
        HospitalSchema.find().lean().then((hospitais) => {
            hospitais.forEach(hospital => {
                console.log(`Hospital: ${hospital.nomeFantasia}`)

            });
            res.render("hospital/index", { hospitais: hospitais })
        }).catch((error) => {
            console.log("Error ao consultar todos os hospitais: " + error)
            res.render("hospital/index")
        })
    }else{
        res.render("hospital/index")
    }

})

router.get("/novoHospital", (req, res) => {
    res.render("hospital/novoHospital")
})

router.post("/novoHospital/add", (req, res) => {
    const { razaoSocial, nomeFantasia, cnpj, email, telefone, celular, rua, bairro, cidade, cep } = req.body
    const erros = []
    if (!razaoSocial || typeof razaoSocial === undefined || razaoSocial === null) {
        erros.push({ menssagem: "Razão Social inválida! Tente novamente." })
    }
    if (!nomeFantasia || typeof nomeFantasia === undefined || nomeFantasia === null) {
        erros.push({ menssagem: "Nome Fantasia inválido! Tente novamente." })
    }
    if (!cnpj || typeof cnpj === undefined || cnpj === null || cnpj.length < 18) {
        erros.push({ menssagem: "CNPJ inválido! Tente novamente." })
    }
    if (!telefone || typeof telefone === undefined || telefone === null || telefone.length < 14) {
        erros.push({ menssagem: "Telefone inválido! Tente novamente." })
    }
    if (!celular || typeof celular === undefined || celular === null || celular.length < 15) {
        erros.push({ menssagem: "Celular inválido! Tente novamente." })
    }
    if (!rua || typeof rua === undefined || rua === null) {
        erros.push({ menssagem: "Rua inválida! Tente novamente." })
    }
    if (!bairro || typeof bairro === undefined || bairro === null) {
        erros.push({ menssagem: "Bairro inválido! Tente novamente." })
    }
    if (!cidade || typeof cidade === undefined || cidade === null) {
        erros.push({ menssagem: "Cidade inválida! Tente novamente." })
    }
    if (!cep || typeof cep === undefined || cep === null) {
        erros.push({ menssagem: "CEP inválido! Tente novamente." })
    }

    if (erros.length > 0) {
        res.render("hospital/novoHospital", { erros: erros })
    } else {
        const novoHospital = ({
            razaoSocial: razaoSocial.toUpperCase(),
            nomeFantasia: nomeFantasia.toUpperCase(),
            cnpj: cnpj.toUpperCase(),
            email: email.toUpperCase(),
            telefone: telefone.toUpperCase(),
            celular: celular.toUpperCase(),
            endereco: [{
                rua: rua.toUpperCase(),
                bairro: bairro.toUpperCase(),
                cidade: cidade.toUpperCase(),
                cep: cep.toUpperCase()
            }]
        })
        new HospitalSchema(novoHospital).save().then(() => {
            console.log("Hospital cadastrado com sucesso!")
            req.flash("msg_sucesso", "Hospital cadastrado com sucesso!")
            res.redirect("/hospital/novoHospital")
        }).catch((error) => {
            console.log("Erro ao cadastrar hospital: " + error)
            req.flash("msg_erro", "Erro ao cadastrar Hospital")
            res.render("hospital/novoHospital")
        })
    }
})

router.get("/detalheHospital/:id", (req, res) => {
    HospitalSchema.findOne({ _id: req.params.id }).lean().then((hospital) => {
        console.log(`Consulta Hospital pelo _id, ${hospital.endereco[0].rua}`)
        res.render("hospital/detalheHospital", { hospital: hospital, endereco: hospital.endereco[0] })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.get("/editarHospital/:id", (req, res) => {
    HospitalSchema.findOne({ _id: req.params.id }).lean().then((hospital) => {
        console.log(`Consulta Hospital pelo _id, ${hospital.endereco[0].rua}`)
        res.render("hospital/editarHospital", { hospital: hospital, endereco: hospital.endereco[0] })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.post("/editHospital", (req, res) => {

    const { razaoSocial, nomeFantasia, cnpj, email, telefone, celular, rua, bairro, cidade, cep, id } = req.body
    console.log(razaoSocial, nomeFantasia, cnpj, email, telefone, celular, rua, bairro, cidade, cep, id)
    const erros = []
    if (!razaoSocial || typeof razaoSocial === undefined || razaoSocial === null) {
        erros.push({ menssagem: "Razão Social inválida! Tente novamente." })
    }
    if (!nomeFantasia || typeof nomeFantasia === undefined || nomeFantasia === null) {
        erros.push({ menssagem: "Nome Fantasia inválido! Tente novamente." })
    }
    if (!cnpj || typeof cnpj === undefined || cnpj === null || cnpj.length < 18) {
        erros.push({ menssagem: "CNPJ inválido! Tente novamente." })
    }
    if (!telefone || typeof telefone === undefined || telefone === null || telefone.length < 14) {
        erros.push({ menssagem: "Telefone inválido! Tente novamente." })
    }
    if (!celular || typeof celular === undefined || celular === null || celular.length < 15) {
        erros.push({ menssagem: "Celular inválido! Tente novamente." })
    }
    if (!rua || typeof rua === undefined || rua === null) {
        erros.push({ menssagem: "Rua inválida! Tente novamente." })
    }
    if (!bairro || typeof bairro === undefined || bairro === null) {
        erros.push({ menssagem: "Bairro inválido! Tente novamente." })
    }
    if (!cidade || typeof cidade === undefined || cidade === null) {
        erros.push({ menssagem: "Cidade inválida! Tente novamente." })
    }
    if (!cep || typeof cep === undefined || cep === null) {
        erros.push({ menssagem: "CEP inválido! Tente novamente." })
    }

    if (erros.length > 0) {
        erros.forEach(erro => {
            console.log(erro)
        });
        res.render("hospital/editarHospital", { erros: erros, id: id })
    } else {
        const updateHospital = ({
            razaoSocial: razaoSocial.toUpperCase(),
            nomeFantasia: nomeFantasia.toUpperCase(),
            cnpj: cnpj.toUpperCase(),
            email: email.toUpperCase(),
            telefone: telefone.toUpperCase(),
            celular: celular.toUpperCase(),
            endereco: [{
                rua: rua.toUpperCase(),
                bairro: bairro.toUpperCase(),
                cidade: cidade.toUpperCase(),
                cep: cep.toUpperCase()
            }]
        })
        HospitalSchema.findOneAndUpdate({ _id: id }, updateHospital).then((hospital) => {
            console.log("Hospital alterado com sucesso!")
            res.redirect("/hospital/detalheHospital/"+id)

        }).catch((error) => {
            console.log("Erro ao editar hospital " + error)
        })
    }
})

//Delete    
// HospitalSchema.findOneAndDelete({_id: "6634e3f01861ef23a77dbcd8"}).then((hospital)=>{
//     console.log(`Hospital ${hospital.nomeFantasia} deletado`)
// }).catch((error)=>{
//     console.log("Erro ao deletar hospital")
// })

module.exports = router