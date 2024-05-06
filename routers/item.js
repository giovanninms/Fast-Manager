const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/ItemSchema")
const ItemSchema = mongoose.model("itens")

//CRUD dos Itens
const novoItem = ({
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
})

module.exports = router