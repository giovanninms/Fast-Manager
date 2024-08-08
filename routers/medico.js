const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/MedicoSchema")
const MedicoSchema = mongoose.model("medicos")

router.get("/", (req,res)=>{
    res.render("medico/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro.toUpperCase()
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nome") {
        MedicoSchema.find({ nome: { $regex: inputFiltro } }).lean().then((medicos) => {
            if (!medicos || medicos.length === 0 ) {
                console.log("medico não encontrado ou medicos.length === 0!")
                res.redirect("/medico/")
            }else if (medicos.length > 1) {
                console.log(`medico ${medicos.nome},`)
                res.render("medico/index", { medicos: medicos })
            } else if (medicos.length == 1) {
                console.log(`medico ${medicos[0].nome},`)
                res.render("medico/filtro", { medico: medicos[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o medico pelo nome: " + error)
        })
    } else if (selectFiltro === "especializacao") {
        MedicoSchema.find({ especializacao: { $regex: inputFiltro.toUpperCase() } }).lean().then((medicos) => {
            if (!medicos || medicos.length === 0) {
                console.log("medico não encontrado ou medicos.length === 0")
                res.redirect("/medico/")
            }else if (medicos.length > 1) {
                console.log(`medico ${medicos.nome},`)
                res.render("medico/index", { medicos: medicos })
            } else if (medicos.length == 1) {
                console.log(`medico ${medicos[0].nome},`)
                res.render("medico/filtro", { medico: medicos[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o medico pela especialização: " + error)
        })
    } else if (selectFiltro === "crm") {
        MedicoSchema.find({ crm: { $regex: inputFiltro.toUpperCase() } }).lean().then((medicos) => {
            if (!medicos || medicos.length === 0 ) {
                req.flash("msg_erro", "Nenhum medico encontrodado pelo CRM!")
                res.redirect("/medico/")
            }else if (medicos.length > 1) {
                medicos.forEach(medico => {
                    console.log(medico.nome)
                });
                res.render("medico/index", { medicos: medicos })
            } else if (medicos.length == 1) {
                console.log(`medico ${medicos[0]},`)
                res.render("medico/filtro", { medico: medicos[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o medico pelo tipo de cirurgia: " + error)
            req.flash("msg_erro", "Nenhum medico encontrodado pelo tipo de cirurgia! ")
            res.redirect("/medico/")
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
        res.render("medico/novomedico", {medicos: MedicoSchema.tiposCirurgia})
})

router.post("/novomedico/add", (req, res) => {
    const {nome, especializacao, cpf, crm, email, telefone, celular} = req.body


    const erros = []
    
    if (!nome || typeof nome === undefined || nome === null) {
        erros.push({ menssagem: "Nome inválido! Tente novamente." })
    }
    if (!especializacao || typeof especializacao === undefined || especializacao === null) {
        erros.push({ menssagem: "Especialização inválida! Tente novamente." })
    }
    if (!cpf || typeof cpf === undefined || cpf === null) {
        erros.push({ menssagem: "Tipo de Cirurgia inválido! Tente novamente." })
    }
    if (!crm || typeof crm === undefined || crm === null) {
        erros.push({ menssagem: "CRM inválido! Tente novamente." })
    }
    if (!email || typeof email === undefined || email === null) {
        erros.push({ menssagem: "E-mail inválido! Tente novamente." })
    }
    if (!telefone || typeof telefone === undefined || telefone === null) {
        erros.push({ menssagem: "Telefone inválido! Tente novamente." })
    }
    if (!celular || typeof celular === undefined || celular === null) {
        erros.push({ menssagem: "Celular inválido! Tente novamente." })
    }

    if (erros.length > 0) {
        res.render("medico/novomedico", { erros: erros })
    } else {
        const novomedico = ({
            nome: nome.toUpperCase(),
            especializacao: especializacao.toUpperCase(),
            cpf: cpf.toUpperCase(),
            crm: crm.toUpperCase(),
            email: email.toUpperCase(),
            telefone:telefone.toUpperCase(),
            celular: celular.toUpperCase()
        })
        new MedicoSchema(novomedico).save().then(() => {
            console.log("medico cadastrado com sucesso!")
            req.flash("msg_sucesso", "medico cadastrado com sucesso!")
            res.render("medico/novoMedico")
        }).catch((error) => {
            console.log("Erro ao cadastrar medico: " + error)
            req.flash("msg_erro", "Erro ao cadastrar medico")
            res.render("medico/novoMedico")
        })
    }
})
router.get("/detalhemedico/:id", (req, res) => {
    MedicoSchema.findOne({ _id: req.params.id }).lean().then((medico) => {
        console.log(`Consulta medico pelo _id, ${medico.especializacao}`)
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
    
        const {nome, especializacao, cpf, crm, id, email, telefone, celular} = req.body
    
        const erros = []
        if (!nome || typeof nome === undefined || nome === null) {
            erros.push({ menssagem: "código inválida! Tente novamente." })
        }
        if (!especializacao || typeof especializacao === undefined || especializacao === null) {
            erros.push({ menssagem: "Descrição inválido! Tente novamente." })
        }
        if (!cpf || typeof cpf === undefined || cpf === null) {
            erros.push({ menssagem: "Tipo de Cirurgia inválido! Tente novamente." })
        }
        if (!crm || typeof crm === undefined || crm === null) {
            erros.push({ menssagem: "crm inválido! Tente novamente." })
        }
        if (!email || typeof email === undefined || email === null) {
            erros.push({ menssagem: "Email inválido! Tente novamente." })
        }
        if (!telefone || typeof telefone === undefined || telefone === null) {
            erros.push({ menssagem: "Telefone inválido! Tente novamente." })
        }
        if (!celular || typeof celular === undefined || celular === null) {
            erros.push({ menssagem: "Celular inválido! Tente novamente." })
        }
    
        if (erros.length > 0) {
            res.render("medico/novomedico", { erros: erros })
        } else {
            const updatemedico = ({
                nome: nome.toUpperCase(),
                especializacao: especializacao.toUpperCase(),
                cpf: cpf.toUpperCase(),
                crm: crm.toUpperCase(),
                email: email.toUpperCase(),
                telefone: telefone,
                celular: celular
            })
            MedicoSchema.findOneAndUpdate({_id: id}, updatemedico).then(() => {
                console.log("medico alterado com sucesso!")
                req.flash("msg_sucesso", "Médico alterado com sucesso!")
                res.redirect("/medico/detalheMedico/" + id)
            }).catch((error) => {
                console.log("Erro ao alterar medico: " + error)
                req.flash("msg_erro", "Erro ao alterar medico")
                res.redirect("/medico/detalheMedico/"+id)
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