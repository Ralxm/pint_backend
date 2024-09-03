const multer = require('multer');
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
controller.postListByCidade = postListByCidade;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('IMAGEM');

async function postCreate(req, res){
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erro ao fazer upload da imagem",
                error: err.message
            });
        }

        const {
            CIDADE, APROVACAO, COLABORADOR, CATEGORIA, SUBCATEGORIA, ESPACO, EVENTO, DATAPUBLICACAO, DATAULTIMAATIVIDADE, TITULO, TEXTO, RATING
        } = req.body;

        try {
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
                IMAGEM: req.file ? req.file.buffer : null,
                VIEWS: 0
            });

            res.status(200).json({
                success: true,
                message: "Post criado",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erro ao criar o post",
                error: error.message
            });
        }
    });
}

async function postList(req, res){
    const data = await Post.findAll({include: [Evento, Espaco, Categoria, Subcategoria, Aprovacao, Cidade, Colaborador], order: ['IDPUBLICACAO']})
    .then(function(data) {
        const posts = data.map(post => {
            if (post.IMAGEM) {
                post.IMAGEM = post.IMAGEM.toString('base64');
            }
            return post;
        });

        res.status(200).json({
            success: true,
            data: posts
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

controller.postListBlob = async (req, res) => {
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
        include: [Evento, Espaco, Categoria, Subcategoria, Aprovacao, Cidade, Colaborador],
        where: { IDPUBLICACAO: id }
    })
    .then(function(data) {
        const posts = data.map(post => {
            if (post.IMAGEM) {
                post.IMAGEM = post.IMAGEM.toString('base64');
            }
            return post;
        });

        res.status(200).json({
            success: true,
            data: posts
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
    const { CIDADE, APROVACAO, COLABORADOR, CATEGORIA, SUBCATEGORIA, ESPACO, EVENTO, DATAPUBLICACAO, DATAULTIMAATIVIDADE, TITULO, TEXTO, RATING} = req.body;
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

controller.increaseViewCount = async (req, res) => {
    const { id } = req.params;
    const { VIEWS } = req.body;
    const data = await Post.update({
        VIEWS: VIEWS
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

controller.setRating = async (req, res) => {
    const { id } = req.params;
    const { RATING } = req.body;
    const data = await Post.update({
        RATING: RATING,
    },{ where: { IDPUBLICACAO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            message: "Avaliação do post atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar a avalição do post",
            error: error.message
        });
    })
}

controller.adminUpdate = async (req, res) => {
    const { id } = req.params;
    const { CATEGORIA, SUBCATEGORIA, TITULO, TEXTO } = req.body;
    const data = await Post.update({
        CATEGORIA: CATEGORIA,
        SUBCATEGORIA: SUBCATEGORIA,
        TITULO: TITULO,
        TEXTO: TEXTO,
    },{ where: { IDPUBLICACAO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            message: "Avaliação do post atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar a avalição do post",
            error: error.message
        });
    })
}

controller.ultimaAtividadeUpdate = async (req, res) => {
    const { id } = req.params;
    const { DATAULTIMAATIVIDADE } = req.body;
    const data = await Post.update({
        DATAULTIMAATIVIDADE : DATAULTIMAATIVIDADE
    },{ where: { IDPUBLICACAO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            message: "Avaliação do post atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar a avalição do post",
            error: error.message
        });
    })
}

controller.topViews = async (req, res) => {
    const data = await Post.findAll({order: [["VIEWS", "DESC"]], limit: 5, attributes: ['IDPUBLICACAO', 'TITULO', 'VIEWS']})
    .then(function(data) {
        const posts = data.map(post => {
            if (post.IMAGEM) {
                post.IMAGEM = post.IMAGEM.toString('base64');
            }
            return post;
        });

        res.status(200).json({
            success: true,
            data: posts
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

async function postListByCidade(req, res){
    const { id } = req.params;
    const data = await Post.findAll({include: [Evento, Espaco, Categoria, Subcategoria, Aprovacao, Cidade, Colaborador], order: ['IDPUBLICACAO'],
        where: {CIDADE : id}
    })
    .then(function(data) {
        const posts = data.map(post => {
            if (post.IMAGEM) {
                post.IMAGEM = post.IMAGEM.toString('base64');
            }
            return post;
        });

        res.status(200).json({
            success: true,
            data: posts
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

module.exports = controller;
