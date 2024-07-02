var Post = require('../model/post')
var Aprovacao = require('../model/aprovacao');
var Edicao_Publicacao = require('../model/edicao_publicacao');
const controller = {};

controller.edicaoPublicacaoCreate = edicaoPublicacaoCreate;
controller.edicaoPublicacaoList = edicaoPublicacaoList;
controller.edicaoPublicacaoGet = edicaoPublicacaoGet;
controller.edicaoPublicacaoDelete = edicaoPublicacaoDelete;
controller.edicaoPublicacaoUpdate = edicaoPublicacaoUpdate;

async function edicaoPublicacaoCreate(req, res) {
    const { IDAPROVACAO, IDPUBLICACAO, TITULOANTERIOR, TITULODEPOIS, TEXTOANTERIOR, TEXTODEPOIS, DATAEDICAO } = req.body;
    const data = await Edicao_Publicacao.create({
        IDAPROVACAO: IDAPROVACAO,
        IDPUBLICACAO: IDPUBLICACAO,
        TITULOANTERIOR: TITULOANTERIOR,
        TITULODEPOIS: TITULODEPOIS,
        TEXTOANTERIOR: TEXTOANTERIOR,
        TEXTODEPOIS: TEXTODEPOIS,
        DATAEDICAO: DATAEDICAO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Edição Publicação Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Edição Publicação",
            error: error.message
        })
    })
}

async function edicaoPublicacaoList(req, res) {
    const data = await Edicao_Publicacao.findAll({include: [Post, Aprovacao], order: ['IDEDICAOPUBLICACAO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as Edições Publicação",
            error: error.message
        });
    });
}

async function edicaoPublicacaoGet(req, res) {
    const { IDEDICAOPUBLICACAO } = req.params;
    const data = await Edicao_Publicacao.findAll({
        where: { IDEDICAOPUBLICACAO: IDEDICAOPUBLICACAO }
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
            message: "Erro ao encontrar a Edição Publicacao",
            error: error.message
        });
    });
}

async function edicaoPublicacaoDelete(req, res) {
    const { id } = req.params;
    const data = await Edicao_Publicacao.destroy({
        where: { IDEDICAOPUBLICACAO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Edição Publicação Apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar a Edição Publicação",
            error: error.message
        });
    });
}

async function edicaoPublicacaoUpdate(req, res) {
    const { id } = req.params;
    const { IDAPROVACAO, IDPUBLICACAO, TITULOANTERIOR, TITULODEPOIS, TEXTOANTERIOR, TEXTODEPOIS, DATAEDICAO } = req.body;
    const data = await Edicao_Publicacao.update({
        IDAPROVACAO: IDAPROVACAO,
        IDPUBLICACAO: IDPUBLICACAO,
        TITULOANTERIOR: TITULOANTERIOR,
        TITULODEPOIS: TITULODEPOIS,
        TEXTOANTERIOR: TEXTOANTERIOR,
        TEXTODEPOIS: TEXTODEPOIS,
        DATAEDICAO: DATAEDICAO,
    }, { where: { IDEDICAOPUBLICACAO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Edição Publicação atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar a Edição Publicação",
            error: error.message
        });
    });
}

module.exports = controller;
