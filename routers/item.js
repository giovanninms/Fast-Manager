const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/ItemSchema")
const ItemSchema = mongoose.model("itens")

//CRUD dos Itens
    //Create
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
    //Read
        //Consulta de um Item pelo _id
ItemSchema.findOne({_id: ""}).then((item)=>{
    console.log(`Consulta do item: ${item.descricao}`)
}).catch((error)=>{
    console.log("Erro ao consultar um item! " + error)
})
        //Consulta de varios item pelo tipo de cirurgia
ItemSchema.find({tipoCirurgia: ""}).lean().then((itens)=>{
    itens.forEach(item => {
        console.log(`Item: ${item.descricao}`)
    });
}).catch((error)=>{
    console.log("Erro ao consultar itens pelo tipo de cirurgia!")
})
    //Update
const updateItem = ({
    codigo: "987654"
})
ItemSchema.findOneAndUpdate({_id: ""}).then((item)=>{
    console.log(`codigo ${item} alterado para ${updateItem.codigo}`)
}).catch((error)=>{
    console.log("Erro ao fazer update no item: " + error)
})
    //Delete
ItemSchema.findOneAndDelete({codigo: ""}).then((item)=>{
    console.log(`Item ${item.nome} deletado`)
}).catch((error)=>{
    console.log("Erro ao deletar item! " + error)
})

module.exports = router