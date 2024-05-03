const mongoose = require("mongoose")
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const handlebars = require("express-handlebars")
const session = require('express-session')
const flash = require('connect-flash')
require("./models/medicoSchema")
const MedicoSchema = mongoose.model("medicos")


app.use(session({
    secret: "segura", 
    saveUninitialized: true
}))
app.use(flash())

app.use((req, res, next)=>{
    res.locals.msg_sucesso = req.flash("msg_sucesso")
    res.locals.msg_erro = req.flash("msg_erro")
    next()
})

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.engine("handlebars", handlebars.engine({defaultLayout: "main"}))
app.set("view engine", "handlebars")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://127.0.0.1/fast_manager").then(()=>{
    console.log("Conexão com banco ok!")
}).catch((erro)=>{
    console.log("Erro ao conectar banco de dados: " + erro)
})

app.get("/", (req, res)=>{
    const novoMedico =  new MedicoSchema({
        nome: "Giovanni Nascimento", 
        cpf: "130.069.739.33", 
        crm: "123456/PR",
        dataNascimento: "2002-04-06",
        especializacao: "Quadril"

    })
    MedicoSchema.findOne().then(()=>{
        novoMedico.save().then(()=>{
            console.log("foi")
        }).cath((erro)=>{
            console.log(erro)
        })
    }).catch((erro)=>{
        console.log(erro)
    })
    

    const primeiraInsercao = MedicoSchema.findOne({})
    res.render("index")
})



const porta = 3000
app.listen(porta, (req, res)=>{
    console.log(`Servidor ok! Porta: ${porta}`)
})

