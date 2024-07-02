var Colaborador = require('../model/colaborador')
var Cidade = require('../model/cidade');
const controller = {};

controller.cidadeCreate = cidadeCreate;
controller.cidadeList = cidadeList;
controller.cidadeGet = cidadeGet;
controller.cidadeDelete = cidadeDelete;
controller.cidadeUpdate = cidadeUpdate;

async function cidadeCreate(req, res) {
    const { NOME } = req.body;  
    const data = await Cidade.create({
        NOME: NOME,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Cidade Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar a Cidade",
            error: error.message
        })
    })
}

async function cidadeList(req, res) {
    const data = await Cidade.findAll({order: ['IDCIDADE']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as cidades",
            error: error.message
        });
    });
}

async function cidadeGet(req, res) {
    const { IDCIDADE } = req.params;
    const data = await Cidade.findAll({
        where: { IDCIDADE: IDCIDADE }
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
            message: "Erro ao encontrar a Cidade",
            error: error.message
        });
    });
}

async function cidadeDelete(req, res) {
    const { id } = req.params;
    const data = await Cidade.destroy({
        where: { IDCIDADE: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Cidade Apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar a Cidade",
            error: error.message
        });
    });
}

async function cidadeUpdate(req, res) {
    const { id } = req.params;
    const { NOME } = req.body;
    const data = await Cidade.update({
        NOME: NOME,
    }, { where: { IDCIDADE: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Cidade atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar a Cidade",
            error: error.message
        });
    });
}

module.exports = controller;
