const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/MedicoSchema")
const MedicoSchema = mongoose.model("medicos")

router.get("/", (req,res)=>{
    res.render("medico/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nome") {
        MedicoSchema.findOne({ codigo: inputFiltro }).lean().then((medico) => {
            console.log(`medico ${medico.descricao},`)
            res.render("medico/filtro", { medico: medico })
        }).catch((error) => {
            console.log("Erro ao consultar o medico pelo nome: " + error)
        })
    } else if (selectFiltro === "expecializacao") {
        MedicoSchema.findOne({ descricao: inputFiltro }).lean().then((medico) => {
            console.log(`medico ${medico.descricao},`)
            res.render("medico/filtro", { medico: medico })
        }).catch((error) => {
            console.log("Erro ao consultar o medico pela expecialização: " + error)
        })
    } else if (selectFiltro === "crm"){
        MedicoSchema.find({ tipoCirurgia: inputFiltro }).lean().then((itens) => {
            console.log(`medico ${itens.descricao},`)
            res.render("medico/index", { itens: itens })
        }).catch((error) => {
            console.log("Erro ao consultar o medico pelo CRM: " + error)
        })
    } else if (selectFiltro === "todos") {
        MedicoSchema.find().lean().then((medicos) => {
            medicos.forEach(medico => {
                console.log(`medico: ${medico.nome}`)

            });
            res.render("medico/index", { medicos: medicos })
        }).catch((error) => {
            console.log("Error ao consultar todos os medicos: " + error)
        })
    }
})
router.get("/novomedico", (req, res) => {
        res.render("medico/novomedico", {itens: MedicoSchema.tiposCirurgia})
})

router.post("/novomedico/add", (req, res) => {
    const {codigo, descricao, tipoCirurgia, quantidade} = req.body

    const erros = []
    if (!codigo || typeof codigo === undefined || codigo === null) {
        erros.push({ menssagem: "código inválida! Tente novamente." })
    }
    if (!descricao || typeof descricao === undefined || descricao === null) {
        erros.push({ menssagem: "Descrição inválido! Tente novamente." })
    }
    if (!tipoCirurgia || typeof tipoCirurgia === undefined || tipoCirurgia === null) {
        erros.push({ menssagem: "Tipo de Cirurgia inválido! Tente novamente." })
    }
    if (!quantidade || typeof quantidade === undefined || quantidade === null) {
        erros.push({ menssagem: "Quantidade inválido! Tente novamente." })
    }

    if (erros.length > 0) {
        res.render("medico/novomedico", { erros: erros })
    } else {
        const novomedico = ({
            codigo: codigo,
            descricao: descricao,
            tipoCirurgia: tipoCirurgia,
            quantidade: quantidade,
        })
        new MedicoSchema(novomedico).save().then(() => {
            console.log("medico cadastrado com sucesso!")
            req.flash("msg_sucesso", "medico cadastrado com sucesso!")
            res.render("medico/novomedico")
        }).catch((error) => {
            console.log("Erro ao cadastrar medico: " + error)
            req.flash("msg_erro", "Erro ao cadastrar medico")
            res.render("medico/novomedico")
        })
    }
})
router.get("/detalhemedico/:id", (req, res) => {
    MedicoSchema.findOne({ _id: req.params.id }).lean().then((medico) => {
        console.log(`Consulta medico pelo _id, ${medico.descricao}`)
        res.render("medico/detalhemedico", { medico: medico, })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.get("/editarmedico/:id", (req, res) => {
    MedicoSchema.findOne({ _id: req.params.id }).lean().then((medico) => {
        console.log(`Consulta medico pelo _id, ${medico}`)
        res.render("medico/editarmedico", { medico: medico})
    }).catch((error) => {
        console.log("Erro ao consultar o medico pelo _id: " + error)
    })
})
router.post("/editmedico", (req, res)=>{
    
        const {codigo, descricao, tipoCirurgia, quantidade, id} = req.body
    
        const erros = []
        if (!codigo || typeof codigo === undefined || codigo === null) {
            erros.push({ menssagem: "código inválida! Tente novamente." })
        }
        if (!descricao || typeof descricao === undefined || descricao === null) {
            erros.push({ menssagem: "Descrição inválido! Tente novamente." })
        }
        if (!tipoCirurgia || typeof tipoCirurgia === undefined || tipoCirurgia === null) {
            erros.push({ menssagem: "Tipo de Cirurgia inválido! Tente novamente." })
        }
        if (!quantidade || typeof quantidade === undefined || quantidade === null) {
            erros.push({ menssagem: "Quantidade inválido! Tente novamente." })
        }
    
        if (erros.length > 0) {
            res.render("medico/novomedico", { erros: erros })
        } else {
            const updatemedico = ({
                codigo: codigo,
                descricao: descricao,
                tipoCirurgia: tipoCirurgia,
                quantidade: quantidade,
            })
            MedicoSchema.findOneAndUpdate({_id: id}, updatemedico).then(() => {
                console.log("medico alterado com sucesso!")
                req.flash("msg_sucesso", "medico alterado com sucesso!")
                res.redirect("/medico/detalhemedico/"+ id)
            }).catch((error) => {
                console.log("Erro ao alterar medico: " + error)
                req.flash("msg_erro", "Erro ao alterar medico")
                res.redirect("/medico/detalhemedico/"+id)
            })
        }
    })

// //CRUD dos medicos

// //Delete
// //Exclusao medico pelo _id
// MedicoSchema.findOneAndDelete({ _id: "6634c927d0dc4db9d91a6bba" }).then((medico) => {
//     console.log(`Medico ${medico.nome} deletado`)
// }).catch((error) => {
//     console.log("Erro ao deletar medico! " + error)
// })

module.exports = router