const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/UsuarioSchema")
const UsuarioSchema = mongoose.model("usuarios")

router.get("/", (req, res)=>{
    res.render("usuario/consultarUsuario")
})
router.get("/novoUsuario", (req, res)=>{
    res.render("usuario/novoUsuario")
})
router.post("/novoUsuario/add", (req, res)=>{
    const {nick, nome, email, senha, nivelUsuario} = req.body
    const novoUsuario = new UsuarioSchema({
            nick: nick,
            nome: nome,
            email: email,
            senha: senha,
            nivelUsuario: nivelUsuario
        })
        
        new UsuarioSchema(novoUsuario).save().then((usuario)=>{
            console.log(`Usuario nick ${usuario.nick} cadastrado com sucesso`)
            req.flash("msg_sucesso", "Usuario cadastrado com sucesso!")
            res.redirect("/usuario/novoUsuario")
        }).catch((error)=>{
            console.log("erro ao cadastrar novo usuario! " + error)
        })
})
//CRUD do Usuario
    //Create

// 
    //Read
        //Consulta de um usuario pelo nick
// Usuario.findOne({nick: "GiovanniNMS"}).then((usuario)=>{
//     console.log(`usuario nick: ${usuario.nick}`)
// }).catch((error)=>{
//     console.log("Erro ao cunsultar uruario pelo nick! " + error)
// })
    //Update
// const updateUsuario =({
//     nick: "GiovanniSilva"
// })

// Usuario.findOneAndUpdate({nick: "GiovanniNMS"}, updateUsuario).then((usuario)=>{
//     console.log(`nick ${usuario.nick} alterado para ${updateUsuario.nick}`)
// }).catch((error)=>{
//     console.log("erro ao atualizar o usuario " + error)
// })
    //Delete
// Usuario.findOneAndDelete({_id: "663a5ccbbfb8b0d90caecee0"}).then((usuario)=>{
//     console.log(`Usuario nick ${usuario.nick} deletado!`)
// }).catch((error)=>{
//     console.log("Erro ao deletar usuario " + error)
// })


module.exports = router