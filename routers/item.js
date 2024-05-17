const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/ItemSchema")
const ItemSchema = mongoose.model("itens")

router.get("/", (req,res)=>{
    res.render("item/index")
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "codigo") {
        ItemSchema.findOne({ codigo: inputFiltro }).lean().then((item) => {
            console.log(`item ${item.descricao},`)
            res.render("item/filtro", { item: item })
        }).catch((error) => {
            console.log("Erro ao consultar o item pelo nome fantasia: " + error)
        })
    } else if (selectFiltro === "descricao") {
        ItemSchema.findOne({ descricao: inputFiltro }).lean().then((item) => {
            console.log(`item ${item.descricao},`)
            res.render("item/filtro", { item: item })
        }).catch((error) => {
            console.log("Erro ao consultar o item pelo cnpj: " + error)
        })
    } else if (selectFiltro === "tipoCirurgia"){
        ItemSchema.find({ tipoCirurgia: inputFiltro }).lean().then((itens) => {
            console.log(`item ${itens.descricao},`)
            res.render("item/index", { itens: itens })
        }).catch((error) => {
            console.log("Erro ao consultar o item pelo tipo de cirurgia: " + error)
        })
    } else if (selectFiltro === "todos") {
        ItemSchema.find().lean().then((itens) => {
            itens.forEach(item => {
                console.log(`item: ${item.descricao}`)

            });
            res.render("item/index", { itens: itens })
        }).catch((error) => {
            console.log("Error ao consultar todos os itens: " + error)
        })
    }
})
router.get("/novoItem", (req, res) => {
        res.render("item/novoItem", {itens: ItemSchema.tiposCirurgia})
})

router.post("/novoItem/add", (req, res) => {
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
        res.render("item/novoItem", { erros: erros })
    } else {
        const novoItem = ({
            codigo: codigo.toUpperCase(),
            descricao: descricao.toUpperCase(),
            tipoCirurgia: tipoCirurgia.toUpperCase(),
            quantidade: quantidade.toUpperCase(),
        })
        new ItemSchema(novoItem).save().then(() => {
            console.log("Item cadastrado com sucesso!")
            req.flash("msg_sucesso", "Item cadastrado com sucesso!")
            res.render("item/novoItem")
        }).catch((error) => {
            console.log("Erro ao cadastrar Item: " + error)
            req.flash("msg_erro", "Erro ao cadastrar Item")
            res.render("item/novoItem")
        })
    }
})
router.get("/detalheItem/:id", (req, res) => {
    ItemSchema.findOne({ _id: req.params.id }).lean().then((item) => {
        console.log(`Consulta item pelo _id, ${item.descricao}`)
        res.render("item/detalheItem", { item: item, })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.get("/editarItem/:id", (req, res) => {
    ItemSchema.findOne({ _id: req.params.id }).lean().then((item) => {
        console.log(`Consulta item pelo _id, ${item}`)
        res.render("item/editarItem", { item: item})
    }).catch((error) => {
        console.log("Erro ao consultar o item pelo _id: " + error)
    })
})
router.post("/editItem", (req, res)=>{
    
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
            res.render("item/novoItem", { erros: erros })
        } else {
            const updateItem = ({
                codigo: codigo.toUpperCase(),
                descricao: descricao.toUpperCase(),
                tipoCirurgia: tipoCirurgia.toUpperCase(),
                quantidade: quantidade.toUpperCase(),
            })
            ItemSchema.findOneAndUpdate({_id: id}, updateItem).then(() => {
                console.log("Item alterado com sucesso!")
                req.flash("msg_sucesso", "Item alterado com sucesso!")
                res.redirect("/item/detalheItem/"+ id)
            }).catch((error) => {
                console.log("Erro ao alterar Item: " + error)
                req.flash("msg_erro", "Erro ao alterar Item")
                res.redirect("/item/detalheItem/"+id)
            })
        }
    })
//CRUD dos Itens
    //Delete
// ItemSchema.findOneAndDelete({_id: "663a38190549b68efad88090"}).then((item)=>{
//     console.log(`Item ${item.codigo} deletado`)
// }).catch((error)=>{
//     console.log("Erro ao deletar item! " + error)
// })

module.exports = router