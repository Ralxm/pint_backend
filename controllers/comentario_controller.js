var Post = require('../model/post');
var Aprovacao = require('../model/aprovacao');
var Colaborador = require('../model/colaborador');
var Comentario = require('../model/comentario');
const controller = {};

controller.comentarioCreate = comentarioCreate;
controller.comentarioList = comentarioList;
controller.comentarioGet = comentarioGet;
controller.comentarioDelete = comentarioDelete;
controller.comentarioUpdate = comentarioUpdate;

async function comentarioCreate(req, res) {
    const { IDPOST, IDAPROVACAO, IDCOLABORADOR } = req.body;
    const data = await Comentario.create({
        IDPOST: IDPOST,
        IDAPROVACAO: IDAPROVACAO,
        IDCOLABORADOR: IDCOLABORADOR,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Comentário Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Comentário",
            error: error.message
        })
    })
}

async function comentarioList(req, res) {
    const data = await Comentario.findAll({include: [Aprovacao, Colaborador], order: ['IDCOMENTARIO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar os Comentarios",
            error: error.message
        });
    });
}

async function comentarioGet(req, res) {
    const { id } = req.params;
    const data = await Comentario.findAll({
        where: { IDCOMENTARIO: id }
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
            message: "Erro ao encontrar o Comentario",
            error: error.message
        });
    });
}

async function comentarioDelete(req, res) {
    const { id } = req.params;
    const data = await Comentario.destroy({
        where: { IDCOMENTARIO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Comentario Apagado"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar o Comentario",
            error: error.message
        });
    });
}

async function comentarioUpdate(req, res) {
    const { id } = req.params;
    const { IDPOST, IDAPROVACAO, IDCOLABORADOR } = req.body;
    const data = await Comentario.update({
        IDPOST: IDPOST,
        IDAPROVACAO: IDAPROVACAO,
        IDCOLABORADOR: IDCOLABORADOR,
    }, { where: { IDCOMENTARIO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Comentario atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Comentario",
            error: error.message
        });
    });
}

controller.comentariosPorPublicacao = async (req, res) => {
    const { id } = req.params;
    const data = await Comentario.findAll({
        where: { IDPOST: id },
        include: [Aprovacao, Colaborador]
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
            message: "Erro ao encontrar o Comentario",
            error: error.message
        });
    });
}

module.exports = controller;
