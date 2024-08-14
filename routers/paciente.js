const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/PacienteSchema")
const PacienteSchema = mongoose.model("pacientes")


router.get("/", (req,res)=>{
    res.render("paciente/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro.toUpperCase()
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nome") {
        PacienteSchema.find({ nome: { $regex: inputFiltro } }).lean().then((pacientes) => {
            if (!pacientes || pacientes.length === 0 ) {
                console.log("paciente não encontrado ou pacientes.length === 0!")
                res.redirect("/paciente/")
            }else if (pacientes.length > 1) {
                console.log(`paciente ${pacientes.nome},`)
                res.render("paciente/index", { pacientes: pacientes })
            } else if (pacientes.length == 1) {
                console.log(`paciente ${pacientes[0].nome},`)
                res.render("paciente/filtro", { paciente: pacientes[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o paciente pelo nome: " + error)
        })
    } else if (selectFiltro === "cpf") {
        PacienteSchema.find({ cpf: { $regex: inputFiltro.toUpperCase() } }).lean().then((pacientes) => {
            if (!pacientes || pacientes.length === 0) {
                console.log("paciente não encontrado ou pacientes.length === 0")
                res.redirect("/paciente/")
            }else if (pacientes.length > 1) {
                console.log(`paciente ${pacientes.nome},`)
                res.render("paciente/index", { pacientes: pacientes })
            } else if (pacientes.length == 1) {
                console.log(`paciente ${pacientes[0].nome},`)
                res.render("paciente/filtro", { paciente: pacientes[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o paciente pelo cpf: " + error)
        })
    } else if (selectFiltro === "rg") {
        PacienteSchema.find({ rg: { $regex: inputFiltro.toUpperCase() } }).lean().then((pacientes) => {
            if (!pacientes || pacientes.length === 0 ) {
                req.flash("msg_erro", "Nenhum paciente encontrodado pelo rg!")
                res.redirect("/paciente/")
            }else if (pacientes.length > 1) {
                pacientes.forEach(paciente => {
                    console.log(paciente.nome)
                });
                res.render("paciente/index", { pacientes: pacientes })
            } else if (pacientes.length == 1) {
                console.log(`paciente ${pacientes[0]},`)
                res.render("paciente/filtro", { paciente: pacientes[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o paciente pelo rg: " + error)
            req.flash("msg_erro", "Nenhum paciente encontrodado pelo rg! ")
            res.redirect("/paciente/")
        })
    } else if (selectFiltro === "todos") {
        PacienteSchema.find().lean().then((pacientes) => {
            pacientes.forEach(paciente => {
                console.log(`paciente: ${paciente.nome}`)

            });
            res.render("paciente/index", { pacientes: pacientes })
        }).catch((error) => {
            console.log("Error ao consultar todos os pacientes: " + error)
        })
    }
})
router.get("/novoPaciente", (req, res) => {
        res.render("paciente/novoPaciente", {pacientes: PacienteSchema.tiposCirurgia})
})

router.post("/novoPaciente/add", (req, res) => {
    const {nome, rg, cpf,  email, dataNascimento, telefone, celular, rua, bairro, cidade, estado, cep} = req.body


    const erros = []
    
    if (!nome || typeof nome === undefined || nome === null) {
        erros.push({ menssagem: "Nome inválido!" })
    }
    if (!rg || typeof rg === undefined || rg === null) {
        erros.push({ menssagem: "RG inválida!" })
    }
    if (!cpf || typeof cpf === undefined || cpf === null) {
        erros.push({ menssagem: "CPF inválido!" })
    }
    if (!dataNascimento || typeof dataNascimento === undefined || dataNascimento === null) {
        erros.push({ menssagem: "Data de nascimento inválido!" })
    }
    if (!email || typeof email === undefined || email === null) {
        erros.push({ menssagem: "E-mail inválido!" })
    }
    if (!telefone || typeof telefone === undefined || telefone === null) {
        erros.push({ menssagem: "Telefone inválido!" })
    }
    if (!celular || typeof celular === undefined || celular === null) {
        erros.push({ menssagem: "Celular inválido!" })
    }
    if (!rua || typeof rua === undefined || rua === null) {
        erros.push({ menssagem: "Rua inválida!" })
    }
    if (!bairro || typeof bairro === undefined || bairro === null) {
        erros.push({ menssagem: "Bairro inválido!" })
    }
    if (!cidade || typeof cidade === undefined || cidade === null) {
        erros.push({ menssagem: "Cidade inválida!" })
    }
    if (!estado || typeof estado === undefined || estado === null) {
        erros.push({ menssagem: "Estado inválido!" })
    }
    if (!cep || typeof cep === undefined || cep === null) {
        erros.push({ menssagem: "CEP inválido!" })
    }

    if (erros.length > 0) {
        console.log("erro")
        res.render("paciente/novoPaciente", { erros: erros })
    } else {
        const novoPaciente = new PacienteSchema({
            nome: nome.toUpperCase(),
            rg: rg.toUpperCase(),
            cpf: cpf.toUpperCase(),
            dataNascimento: dataNascimento,
            email: email.toUpperCase(),
            telefone:telefone.toUpperCase(),
            celular: celular.toUpperCase(),
            endereco: [{
                rua: rua.toUpperCase(),
                bairro: bairro.toUpperCase(),
                cidade: cidade.toUpperCase(),
                cep: cep.toUpperCase()
            }]
        })
        new PacienteSchema(novoPaciente).save().then(() => {
            console.log("paciente cadastrado com sucesso!")
            req.flash("msg_sucesso", "paciente cadastrado com sucesso!")
            res.redirect("/paciente/novoPaciente")
        }).catch((error) => {
            console.log("Erro ao cadastrar paciente: " + error)
            req.flash("msg_erro", "Erro ao cadastrar paciente")
            res.render("paciente/novoPaciente")
        })
    }
})
router.get("/detalhePaciente/:id", (req, res) => {
    PacienteSchema.findOne({ _id: req.params.id }).lean().then((paciente) => {
        const novaData = paciente.dataNascimento
        const dataFormatada = new Intl.DateTimeFormat('pt-BR',{
            dateStyle: 'short',
            //timeStyle: 'short',
            timeZone: 'America/Sao_Paulo',
        }).format(novaData)
        console.log(dataFormatada,)
        console.log(`Consulta paciente pelo _id, ${paciente.rg}`)
        res.render("paciente/detalhePaciente", { paciente: paciente, endereco: paciente.endereco[0], dataFormatada: dataFormatada })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.get("/editarPaciente/:id", (req, res) => {
    PacienteSchema.findOne({ _id: req.params.id }).lean().then((paciente) => {
        const novaData = paciente.dataNascimento
        const dataFormatada = new Intl.DateTimeFormat('pt-BR',{
            dateStyle: 'short',
            //timeStyle: 'short',
            timeZone: 'America/Sao_Paulo',
        }).format(novaData)
        const dataFormatadaDate = new Date(dataFormatada)
        console.log(typeof dataFormatadaDate + dataFormatadaDate + dataFormatada)
        console.log(`Consulta paciente pelo _id, ${paciente}`)
        res.render("paciente/editarPaciente", { paciente: paciente, endereco: paciente.endereco[0] , dataFormatada: dataFormatada})
    }).catch((error) => {
        console.log("Erro ao consultar o paciente pelo _id: " + error)
    })
})
router.post("/editPaciente", (req, res)=>{
    
        const {nome, rg, cpf, id, email, telefone, celular, rua, bairro, cidade, estado, cep} = req.body
    
        const erros = []
        if (!nome || typeof nome === undefined || nome === null) {
            erros.push({ menssagem: "código inválida!" })
        }
        if (!rg || typeof rg === undefined || rg === null) {
            erros.push({ menssagem: "Descrição inválido!" })
        }
        if (!cpf || typeof cpf === undefined || cpf === null) {
            erros.push({ menssagem: "CPF inválido!" })
        }
        if (!cpf || typeof cpf === undefined || cpf === null) {
            erros.push({ menssagem: "cpf inválido!" })
        }
        if (!email || typeof email === undefined || email === null) {
            erros.push({ menssagem: "Email inválido!" })
        }
        if (!telefone || typeof telefone === undefined || telefone === null) {
            erros.push({ menssagem: "Telefone inválido!" })
        }
        if (!celular || typeof celular === undefined || celular === null) {
            erros.push({ menssagem: "Celular inválido!" })
        }
        if(!rua || typeof rua === undefined || rua === null){
            erros.push({menssagem: "Rua inválida!"})
        }
        if(!bairro || typeof bairro === undefined || bairro === null){
            erros.push({menssagem: "Bairro inválido"})
        }
        if(!cidade || typeof cidade === undefined || cidade === null){
            erros.push({menssagem: "Cidade inválida!"})
        }
        if (!estado || typeof estado === undefined || estado === null) {
            erros.push({menssagem: "Estado inválido!"})
        }
        if (!cep || typeof cep === undefined || cep === null) {
            erros.push({menssagem: "CEP inválido!"})
        }
    
        if (erros.length > 0) {
            res.render("paciente/novoPaciente", { erros: erros })
        } else {
            const updatepaciente = ({
                nome: nome.toUpperCase(),
                rg: rg.toUpperCase(),
                cpf: cpf.toUpperCase(),
                cpf: cpf.toUpperCase(),
                email: email.toUpperCase(),
                telefone: telefone,
                celular: celular,
                rua: rua.toUpperCase(),
                bairro: bairro.toUpperCase(),
                cidade: cidade.toUpperCase(),
                estado: estado.toUpperCase(),
                cep: cep
            })
            PacienteSchema.findOneAndUpdate({_id: id}, updatepaciente).then(() => {
                console.log("paciente alterado com sucesso!")
                req.flash("msg_sucesso", "Paciente alterado com sucesso!")
                res.redirect("/paciente/detalhePaciente/" + id)
            }).catch((error) => {
                console.log("Erro ao alterar paciente: " + error)
                req.flash("msg_erro", "Erro ao alterar paciente")
                res.redirect("/paciente/detalhePaciente/"+id)
            })
        }
    })

//     //Delete
// PacienteSchema.findOneAndDelete({_id: "6634d89147281dbc185ea3e4"}).then((paciente)=>{
//     console.log(`Paciente ${paciente.nome} deletado!`)
// }).catch((error)=>{
//     console.log("Erro ao deletar paciente! " + error)
// })


module.exports = router