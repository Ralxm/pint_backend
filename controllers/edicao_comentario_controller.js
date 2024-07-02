var Comentario = require('../model/comentario');
var Aprovacao = require('../model/aprovacao');
var Edicao_Comentario = require('../model/edicao_comentario'); 
const controller = {};

controller.edicaoComentarioCreate = edicaoComentarioCreate;
controller.edicaoComentarioList = edicaoComentarioList;
controller.edicaoComentarioGet = edicaoComentarioGet;
controller.edicaoComentarioDelete = edicaoComentarioDelete;
controller.edicaoComentarioUpdate = edicaoComentarioUpdate;

async function edicaoComentarioCreate(req, res) {
    const { IDCOMENTARIO, IDAPROVACAO, TEXTOANTERIOR, TEXTODEPOIS, DATAEDICAO } = req.body;
    const data = await Edicao_Comentario.create({
        IDCOMENTARIO: IDCOMENTARIO,
        IDAPROVACAO: IDAPROVACAO,
        TEXTOANTERIOR: TEXTOANTERIOR,
        TEXTODEPOIS: TEXTODEPOIS,
        DATAEDICAO: DATAEDICAO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Edição Comentário Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar a Edição Comentário",
            error: error.message
        })
    })
}

async function edicaoComentarioList(req, res) {
    const data = await Edicao_Comentario.findAll({include: [Comentario, Aprovacao], order: ['IDEDICAOCOMENTARIO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as Edicoes_Comentario",
            error: error.message
        });
    });
}

async function edicaoComentarioGet(req, res) {
    const { IDEDICAOCOMENTARIO } = req.params;
    const data = await Edicao_Comentario.findAll({
        where: { IDEDICAOCOMENTARIO: IDEDICAOCOMENTARIO }
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
            message: "Erro ao encontrar a Edicao_Comentario",
            error: error.message
        });
    });
}

async function edicaoComentarioDelete(req, res) {
    const { id } = req.params;
    const data = await Edicao_Comentario.destroy({
        where: { IDEDICAOCOMENTARIO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Edicao_Comentario Apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar a Edicao_Comentario",
            error: error.message
        });
    });
}

async function edicaoComentarioUpdate(req, res) {
    const { id } = req.params;
    const { IDCOMENTARIO, IDAPROVACAO, TEXTOANTERIOR, TEXTODEPOIS, DATAEDICAO } = req.body;
    const data = await Edicao_Comentario.update({
        IDCOMENTARIO: IDCOMENTARIO,
        IDAPROVACAO: IDAPROVACAO,
        TEXTOANTERIOR: TEXTOANTERIOR,
        TEXTODEPOIS: TEXTODEPOIS,
        DATAEDICAO: DATAEDICAO,
    }, { where: { IDEDICAOCOMENTARIO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Edicao_Comentario atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status (500).json({
            success: false,
            message: "Erro ao atualizar a Edicao_Comentario",
            error: error.message
        });
    });
}

module.exports = controller;
