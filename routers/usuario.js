const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/UsuarioSchema")
const UsuarioSchema = mongoose.model("usuarios")

router.get("/", (req, res) => {
    res.render("usuario/index")
})
router.get("/novoUsuario", (req, res) => {
    res.render("usuario/novoUsuario")
})
router.post("/novoUsuario/add", (req, res) => {
    const { nick, nome, email, senha, nivelUsuario } = req.body
    const novoUsuario = new UsuarioSchema({
        nick: nick.toUpperCase(),
        nome: nome.toUpperCase(),
        email: email.toUpperCase(),
        senha: senha.toUpperCase(),
        nivelUsuario: nivelUsuario.toUpperCase()
    })

    new UsuarioSchema(novoUsuario).save().then((usuario) => {
        console.log(`Usuario nick ${usuario.nick} cadastrado com sucesso`)
        req.flash("msg_sucesso", "Usuario cadastrado com sucesso!")
        res.redirect("/usuario/novoUsuario")
    }).catch((error) => {
        console.log("erro ao cadastrar novo usuario! " + error)
    })
})

router.post("/filtro", (req, res) => {
    const inputFiltro = req.body.inputFiltro.toUpperCase()
    const selectFiltro = req.body.selectFiltro

    if (selectFiltro === "nome") {
        UsuarioSchema.find({ nome: { $regex: inputFiltro } }).lean().then((usuarios) => {
            if (!usuarios || usuarios.length === 0 ) {
                console.log("usuario não encontrado ou usuarios.length === 0!")
                res.redirect("/usuario/")
            }else if (usuarios.length > 1) {
                console.log(`usuario ${usuarios.nome},`)
                res.render("usuario/index", { usuarios: usuarios })
            } else if (usuarios.length == 1) {
                console.log(`usuario ${usuarios[0].nome},`)
                res.render("usuario/filtro", { usuario: usuarios[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o usuario pelo nome: " + error)
        })
    } else if (selectFiltro === "nick") {
        UsuarioSchema.find({ nick: { $regex: inputFiltro.toUpperCase() } }).lean().then((usuarios) => {
            if (!usuarios || usuarios.length === 0) {
                console.log("usuario não encontrado ou usuarios.length === 0")
                res.redirect("/usuario/")
            }else if (usuarios.length > 1) {
                console.log(`usuario ${usuarios.nome},`)
                res.render("usuario/index", { usuarios: usuarios })
            } else if (usuarios.length == 1) {
                console.log(`usuario ${usuarios[0].nome},`)
                res.render("usuario/filtro", { usuario: usuarios[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o usuario pelo nick: " + error)
        })
    } else if (selectFiltro === "nivelUsuario") {
        UsuarioSchema.find({ nivelUsuario: { $regex: inputFiltro.toUpperCase() } }).lean().then((usuarios) => {
            if (!usuarios || usuarios.length === 0 ) {
                req.flash("msg_erro", "Nenhum usuario encontrodado pelo nvel do usuario!")
                res.redirect("/usuario/")
            }else if (usuarios.length > 1) {
                usuarios.forEach(usuario => {
                    console.log(usuario.nome)
                });
                res.render("usuario/index", { usuarios: usuarios })
            } else if (usuarios.length == 1) {
                console.log(`usuario ${usuarios[0]},`)
                res.render("usuario/filtro", { usuario: usuarios[0] })
            }
        }).catch((error) => {
            console.log("Erro ao consultar o usuario pelo nivel do usuario: " + error)
            req.flash("msg_erro", "Nenhum usuario encontrodado pelo nivel do usuario! ")
            res.redirect("/usuario/")
        })
    } else if (selectFiltro === "todos") {
        UsuarioSchema.find().lean().then((usuarios) => {
            usuarios.forEach(usuario => {
                console.log(`usuario: ${usuario.nome}`)

            });
            res.render("usuario/index", { usuarios: usuarios })
        }).catch((error) => {
            console.log("Error ao consultar todos os usuarios: " + error)
        })
    }
})

router.get("/detalheUsuario/:id", (req, res) => {
    UsuarioSchema.findOne({ _id: req.params.id }).lean().then((usuario) => {
        console.log(`Consulta usuario pelo _id, ${usuario.nick}`)
        res.render("usuario/detalheUsuario", { usuario: usuario, })
    }).catch((error) => {
        console.log("Erro ao consultar o hospital pelo _id: " + error)
    })
})
router.get("/editarUsuario/:id", (req, res) => {
    UsuarioSchema.findOne({ _id: req.params.id }).lean().then((usuario) => {
        console.log(`Consulta usuario pelo _id, ${usuario}`)
        res.render("usuario/editarUsuario", { usuario: usuario})
    }).catch((error) => {
        console.log("Erro ao consultar o usuario pelo _id: " + error)
    })
})
router.post("/editusuario", (req, res)=>{
    
        const {nome, nick, id, email, senha, celular} = req.body
    
        const erros = []
        if (!nome || typeof nome === undefined || nome === null) {
            erros.push({ menssagem: "código inválida! Tente novamente." })
        }
        if (!nick || typeof nick === undefined || nick === null) {
            erros.push({ menssagem: "Tipo de Cirurgia inválido! Tente novamente." })
        }
        if (!email || typeof email === undefined || email === null) {
            erros.push({ menssagem: "Email inválido! Tente novamente." })
        }
        if (!senha || typeof senha === undefined || senha === null) {
            erros.push({ menssagem: "senha inválido! Tente novamente." })
        }
        if (erros.length > 0) {
            res.render("usuario/novoUsuario", { erros: erros })
        } else {
            const updateUsuario = ({
                nome: nome.toUpperCase(),
                nick: nick.toUpperCase(),
                email: email.toUpperCase(),
                senha: senha
            })
            UsuarioSchema.findOneAndUpdate({_id: id}, updateUsuario).then(() => {
                console.log("Usuario alterado com sucesso!")
                req.flash("msg_sucesso", "Médico alterado com sucesso!")
                res.redirect("/usuario/detalheUsuario/" + id)
            }).catch((error) => {
                console.log("Erro ao alterar usuario: " + error)
                req.flash("msg_erro", "Erro ao alterar usuario")
                res.redirect("/usuario/detalheUsuario/"+id)
            })
        }
    })
//CRUD do Usuario
//Create

// 
//Read

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