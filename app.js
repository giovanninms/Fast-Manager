const mongoose = require("mongoose")
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const handlebars = require("express-handlebars")
const session = require('express-session')
const flash = require('connect-flash')

require("./models/medicoSchema")
const MedicoSchema = mongoose.model("medicos")

require("./models/PacienteSchema")
const PacienteSchema = mongoose.model("pacientes")

require("./models/HospitalSchema")
const HospitalSchema = mongoose.model("hospitais")

require("./models/ItemSchema")
const ItemSchema = mongoose.model("itens")


app.use(session({
    secret: "secret",
    saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next) => {
    res.locals.msg_sucesso = req.flash("msg_sucesso")
    res.locals.msg_erro = req.flash("msg_erro")
    next()
})

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.engine("handlebars", handlebars.engine({ defaultLayout: "main" }))
app.set("view engine", "handlebars")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1/fast_manager").then(() => {
    console.log("Conexão com banco ok!")
}).catch((erro) => {
    console.log("Erro ao conectar banco de dados: " + erro)
})

app.get("/", (req, res) => {
    //----------------------------------------------------------------------------------
    //Cadastro de medico
    /*const novoMedico = ({
        nome: "Giovanni Nascimento",
        cpf: "130.069.739.33",
        crm: "654321/PR",
        dataNascimento: "2002-04-06",
        especializacao: "Quadril"
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
    })*/
    //----------------------------------------------------------------------------------
    //Cadastro de pacientes
    /*const novoPaciente = ({
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
    new PacienteSchema(novoPaciente).save().then(()=>{
        console.log("Paciente cadastrado com sucesso!")
        req.flash("msg_sucesso", "Paciente cadastrado com sucesso!"),
        res.render("index")
    }).catch((error)=>{
        console.log("Erro ao cadastrar paciente! " + error)
        req.flash("msg_erro","Erro ao cadastrar paciente!")
        res.render("index")
    })*/

    //----------------------------------------------------------------------------------
    //Cadastro de hospital
    /*const novoHospital = ({
        razaoSocial: "UNIORT.E - ORTOPEDIA ESPECIALIZADA LTDA",
        nomeFantasia: "CENTRO DE ORTOPEDIA UNIORTE",
        cnpj: "10.246.214/0001-04",
        email: "uniorte@email.com",
        telefone: "(43) 3377-0900", 
        celular:"(43) 93377-0900", 
        endereco: [{
            rua: "AVENIDA HIGIENOPOLIS, 2600", 
            bairro: "PARQUE GUANABARA",
            cidade: "Londrina", 
            cep: "86.050-000"
        }]
    })
    new HospitalSchema(novoHospital).save().then(()=>{
        console.log("Hospital cadastrado com sucesso!")
        req.flash("msg_sucesso", "Hospital cadastrado com sucesso!")
        res.render("index")
    }).catch((error)=>{
        console.log("Erro ao cadastrar hospital: " + error)
        req.flash("msg_erro", "Erro ao cadastrar Hospital")
        res.render("index")
    })*/

    //----------------------------------------------------------------------------------
    //Cadastro de Itens
    /*const novoItem = ({
        codigo: "123456",
        referenncia: "Descricao sem acentuacao",
        quantidade: 25
    })

    ItemSchema(novoItem).save().then(() => {
        console.log("Item Cadastrado com sucesso!")
        req.flash("msg_sucesso", "Item cadastrado com sucesso!")
        res.render("index")
    }).catch((error) => {
        console.log("Erro ao cadastrar item: " + error)
        req.flash("msg_erro", "Erro ao cadastrar Item!")
        res.render("index")
    })*/
    //----------------------------------------------------------------------------------
    //Cadastro de Agendamento
    
})



const porta = 3000
app.listen(porta, (req, res) => {
    console.log(`Servidor ok! Porta: ${porta}`)
})

