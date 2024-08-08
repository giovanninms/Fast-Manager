const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/AgendamentoSchema")
const AgendamentoSchema = mongoose.model("agendamentos")

//CRUD do Agendamento

router.get("/", (req,res)=>{
    res.render("agendamento/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nome") {
        AgendamentoSchema.find({ nome: { $regex: inputFiltro } }).lean().then((agendamentos) => {
            if (!agendamentos || agendamentos.length === 0 ) {
                console.log("agendamento não encontrado ou agendamentos.length === 0!")
                res.redirect("/agendamento/")
            }else if (agendamentos.length > 1) {
                console.log(`agendamento ${agendamentos.nome},`)
                res.render("agendamento/index", { agendamentos: agendamentos })
            } else if (agendamentos.length == 1) {
                console.log(`agendamento ${agendamentos[0].nome},`)
                res.render("agendamento/filtro", { agendamento: agendamentos[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o agendamento pelo nome: " + error)
        })
    } else if (selectFiltro === "especializacao") {
        AgendamentoSchema.find({ especializacao: { $regex: inputFiltro.toUpperCase() } }).lean().then((agendamentos) => {
            if (!agendamentos || agendamentos.length === 0) {
                console.log("agendamento não encontrado ou agendamentos.length === 0")
                res.redirect("/agendamento/")
            }else if (agendamentos.length > 1) {
                console.log(`agendamento ${agendamentos.nome},`)
                res.render("agendamento/index", { agendamentos: agendamentos })
            } else if (agendamentos.length == 1) {
                console.log(`agendamento ${agendamentos[0].nome},`)
                res.render("agendamento/filtro", { agendamento: agendamentos[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o agendamento pela especialização: " + error)
        })
    } else if (selectFiltro === "crm") {
        AgendamentoSchema.find({ crm: { $regex: inputFiltro.toUpperCase() } }).lean().then((agendamentos) => {
            if (!agendamentos || agendamentos.length === 0 ) {
                req.flash("msg_erro", "Nenhum agendamento encontrodado pelo CRM!")
                res.redirect("/agendamento/")
            }else if (agendamentos.length > 1) {
                agendamentos.forEach(agendamento => {
                    console.log(agendamento.nome)
                });
                res.render("agendamento/index", { agendamentos: agendamentos })
            } else if (agendamentos.length == 1) {
                console.log(`agendamento ${agendamentos[0]},`)
                res.render("agendamento/filtro", { agendamento: agendamentos[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o agendamento pelo tipo de cirurgia: " + error)
            req.flash("msg_erro", "Nenhum agendamento encontrodado pelo tipo de cirurgia! ")
            res.redirect("/agendamento/")
        })
    } else if (selectFiltro === "todos") {
        AgendamentoSchema.find().lean().then((agendamentos) => {
            agendamentos.forEach(agendamento => {
                console.log(`agendamento: ${agendamento.nome}`)

            });
            res.render("agendamento/index", { agendamentos: agendamentos })
        }).catch((error) => {
            console.log("Error ao consultar todos os agendamentos: " + error)
        })
    }
})
router.get("/novoAgendamento", (req, res) => {
        res.render("agendamento/novoAgendamento", {agendamentos: AgendamentoSchema.tiposCirurgia})
})

router.post("/novoAgendamento/add", (req, res) => {
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
        res.render("agendamento/novoaAendamento", { erros: erros })
    } else {
        const novoagendamento = ({
            nome: nome.toUpperCase(),
            especializacao: especializacao.toUpperCase(),
            cpf: cpf.toUpperCase(),
            crm: crm.toUpperCase(),
            email: email.toUpperCase(),
            telefone:telefone.toUpperCase(),
            celular: celular.toUpperCase()
        })
        new AgendamentoSchema(novoagendamento).save().then(() => {
            console.log("agendamento cadastrado com sucesso!")
            req.flash("msg_sucesso", "agendamento cadastrado com sucesso!")
            res.render("agendamento/novoAgendamento")
        }).catch((error) => {
            console.log("Erro ao cadastrar agendamento: " + error)
            req.flash("msg_erro", "Erro ao cadastrar agendamento")
            res.render("agendamento/novoAgendamento")
        })
    }
})
router.get("/detalheAgendamento/:id", (req, res) => {
    AgendamentoSchema.findOne({ _id: req.params.id }).lean().then((agendamento) => {
        console.log(`Consulta agendamento pelo _id, ${agendamento.especializacao}`)
        res.render("agendamento/detalheAgendamento", { agendamento: agendamento, })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.get("/editaragendamento/:id", (req, res) => {
    AgendamentoSchema.findOne({ _id: req.params.id }).lean().then((agendamento) => {
        console.log(`Consulta agendamento pelo _id, ${agendamento}`)
        res.render("agendamento/editarAgendamento", { agendamento: agendamento})
    }).catch((error) => {
        console.log("Erro ao consultar o agendamento pelo _id: " + error)
    })
})
router.post("/editAgendamento", (req, res)=>{
    
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
            res.render("agendamento/novoAgendamento", { erros: erros })
        } else {
            const updateagendamento = ({
                nome: nome.toUpperCase(),
                especializacao: especializacao.toUpperCase(),
                cpf: cpf.toUpperCase(),
                crm: crm.toUpperCase(),
                email: email.toUpperCase(),
                telefone: telefone,
                celular: celular
            })
            AgendamentoSchema.findOneAndUpdate({_id: id}, updateagendamento).then(() => {
                console.log("agendamento alterado com sucesso!")
                req.flash("msg_sucesso", "Médico alterado com sucesso!")
                res.redirect("/agendamento/detalheAgendamento/" + id)
            }).catch((error) => {
                console.log("Erro ao alterar agendamento: " + error)
                req.flash("msg_erro", "Erro ao alterar agendamento")
                res.redirect("/agendamento/detalheAgendamento/"+id)
            })
        }
    })
        //Delete
    // AgendamentoSchema.findOneAndDelete({_id: "6638f79ad28135379e9a7266"}).then((agendamento)=>{
    //     console.log(`Agendamento ${agendamento.paciente} excluido`)
    // }).catch((error)=>{
    //     console.log("Erro ao deletar o agendamento " + error)
    // })


module.exports = router