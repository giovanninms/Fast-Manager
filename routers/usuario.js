const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/UsuarioSchema")
const Usuario = mongoose.model("usuarios")


//CRUD do Usuario
    //Create
// const novoUsuario = ({
//     nick: "GiovanniNMS",
//     nome: "Giovanni Nascimento de Moraes Silva",
//     email: "jovincu123@gmail.com",
//     senha: "1234",
//     nivelUsuario: "ADM"
// })

// new Usuario(novoUsuario).save().then((usuario)=>{
//     console.log(`Usuario nick ${usuario.nick} cadastrado com sucesso`)
// }).catch((error)=>{
//     console.log("erro ao cadastrar novo usuario! " + error)
// })
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