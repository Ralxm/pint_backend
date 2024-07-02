var Questionario = require('../model/questionario')
var OpcaoEscolha = require('../model/opcoes_escolha');
const OpcoesEscolha = require('../model/opcoes_escolha');
const controller = {};

controller.opcaoEscolhaCreate = opcaoEscolhaCreate;
controller.opcaoEscolhaList = opcaoEscolhaList;
controller.opcaoEscolhaGet = opcaoEscolhaGet;
controller.opcaoEscolhaDelete = opcaoEscolhaDelete;
controller.opcaoEscolhaUpdate = opcaoEscolhaUpdate;

async function opcaoEscolhaCreate(req, res) {
    const { NOME, TIPOOPCAO, QUESTIONARIO } = req.body;
    const data = await OpcaoEscolha.create({
        NOME: NOME,
        TIPOOPCAO: TIPOOPCAO,
        QUESTIONARIO: QUESTIONARIO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Opções Escolha Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar Opções Escolha",
            error: error.message
        })
    })
}

async function opcaoEscolhaList(req, res) {
    const data = await OpcaoEscolha.findAll({include: [Questionario], order: ['IDOPCAO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as Opções de Escolha",
            error: error.message
        });
    });
}

async function opcaoEscolhaGet(req, res) {
    const { IDOPCAO } = req.params;
    const data = await Evento.findAll()
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao encontrar a Opção de Escolha",
            error: error.message
        });
    });
}

async function opcaoEscolhaDelete(req, res) {
    const { id } = req.params;
    const data = await OpcaoEscolha.destroy({
        where: { IDOPCAO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Opção de Escolha Apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar a Opção de Escolha",
            error: error.message
        });
    });
}

async function opcaoEscolhaUpdate(req, res) {
    const { id } = req.params;
    const { NOME, TIPOOPCAO, QUESTIONARIO } = req.body;
    const data = await OpcaoEscolha.update({
        NOME: NOME,
        TIPOOPCAO: TIPOOPCAO,
        QUESTIONARIO: QUESTIONARIO,
    }, { where: { IDOPCAO: id }})
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Opção de Escolha Apagado"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar a Opção de Escolha",
            error: error.message
        });
    });
}

module.exports = controller;
