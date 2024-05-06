const mongoose = require("mongoose")
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const handlebars = require("express-handlebars")
const session = require('express-session')
const flash = require('connect-flash')

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

})



const porta = 3000
app.listen(porta, (req, res) => {
    console.log(`Servidor ok! Porta: ${porta}`)
})

