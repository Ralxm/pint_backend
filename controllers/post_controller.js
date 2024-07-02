var Colaborador = require('../model/colaborador')
var Cidade= require('../model/cidade')
var Aprovacao = require('../model/aprovacao')
var Subcategoria = require('../model/subcategoria');
var Categoria = require('../model/categoria')
var Espaco = require('../model/espaco')
var Evento = require('../model/evento')
var Post = require('../model/post')
const controller = {};
controller.postCreate = postCreate;
controller.postList = postList;
controller.postGet = postGet;
controller.postDelete = postDelete;
controller.postUpdate = postUpdate;

async function postCreate(req, res){
    const { CIDADE, APROVACAO, COLABORADOR, CATEGORIA, SUBCATEGORIA, ESPACO, EVENTO, DATAPUBLICACAO, DATAULTIMAATIVIDADE, TITULO, TEXTO, RATING, ALBUM } = req.body;
    const data = await Post.create({
        CIDADE: CIDADE,
        APROVACAO: APROVACAO,
        COLABORADOR: COLABORADOR,
        CATEGORIA: CATEGORIA,
        SUBCATEGORIA: SUBCATEGORIA,
        ESPACO: ESPACO,
        EVENTO: EVENTO,
        DATAPUBLICACAO: DATAPUBLICACAO,
        DATAULTIMAATIVIDADE: DATAULTIMAATIVIDADE,
        TITULO: TITULO,
        TEXTO: TEXTO,
        RATING: RATING,
        ALBUM: ALBUM,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Post Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Post",
            error: error.message
        })
    })
}

async function postList(req, res){
    const data = await Post.findAll({include: [Evento, Espaco, Categoria, Subcategoria, Aprovacao, Cidade, Colaborador], order: ['IDPUBLICACAO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar os posts",
            error: error.message
        });
    });
}

async function postGet(req, res){
    const { id } = req.params;
    const data = await Post.findAll({
        where: { IDPUBLICACAO: id }
    })
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a encontrar o post",
            error: error
        });
    })
}

async function postDelete(req, res){
    const { id } = req.params;
    const data = await Post.destroy({
        where: {IDPUBLICACAO: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Post Apagado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar o Post",
            error: error.message
        });
    })
}

async function postUpdate(req, res){
    const { id } = req.params;
    const { CIDADE, APROVACAO, COLABORADOR, CATEGORIA, SUBCATEGORIA, ESPACO, EVENTO, DATAPUBLICACAO, DATAULTIMAATIVIDADE, TITULO, TEXTO, RATING, ALBUM } = req.body;
    const data = await Post.update({
        CIDADE: CIDADE,
        APROVACAO: APROVACAO,
        COLABORADOR: COLABORADOR,
        CATEGORIA: CATEGORIA,
        SUBCATEGORIA: SUBCATEGORIA,
        ESPACO: ESPACO,
        EVENTO: EVENTO,
        DATAPUBLICACAO: DATAPUBLICACAO,
        DATAULTIMAATIVIDADE: DATAULTIMAATIVIDADE,
        TITULO: TITULO,
        TEXTO: TEXTO,
        RATING: RATING,
        ALBUM: ALBUM,
    },{ where: { IDPUBLICACAO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            data: data,
            message: "Post atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar o Post",
            error: error.message
        });
    })
}

module.exports = controller;
