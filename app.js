const mongoose = require("mongoose")
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const handlebars = require("express-handlebars")
const session = require('express-session')
const flash = require('connect-flash')
const agendamento = require("./routers/agendamento")
const hospital = require("./routers/hospital")
const item = require("./routers/item")
const medico = require("./routers/medico")
const paciente = require("./routers/paciente")
const Usuario = require("./routers/usuario")

app.use(session({
    secret: "secret",
    resave: false,
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
    res.render("index")
})

app.use("/agendamento", agendamento)
app.use("/hospital", hospital)
app.use("/item", item)
app.use("/medico", medico)

app.use("/usuario", Usuario)
app.use("/paciente", paciente)
const porta = 3000
app.listen(porta, (req, res) => {
    console.log(`Servidor ok! Porta: ${porta}`)
})

