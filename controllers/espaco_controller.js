
var Espaco = require('../model/espaco');
const controller = {};

controller.espacoCreate = espacoCreate;
controller.espacoList = espacoList;
controller.espacoGet = espacoGet;
controller.espacoDelete = espacoDelete;
controller.espacoUpdate = espacoUpdate;

async function espacoCreate(req, res) {
    const { COORDENADAS, WEBSITE, IDPOST } = req.body;
    const data = await Espaco.create({
        COORDENADAS: COORDENADAS,
        WEBSITE: WEBSITE,
        IDPOST: IDPOST,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Espaço Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Espaço",
            error: error.message
        })
    })
}

async function espacoList(req, res) {
    const data = await Espaco.findAll({order: ['IDESPACO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar os Espaços",
            error: error.message
        });
    });
}

async function espacoGet(req, res) {
    const { IDESPACO } = req.params;
    const data = await Espaco.findAll({
        where: { IDESPACO: IDESPACO }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            data: opcao
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao encontrar o Espaço",
            error: error.message
        });
    });
}

async function espacoDelete(req, res) {
    const { id } = req.params;
    const data = await Espaco.destroy({
        where: { IDESPACO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Espaço Apagado"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar o Espaço",
            error: error.message
        });
    });
}

async function espacoUpdate(req, res) {
    const { id } = req.params;
    const { COORDENADAS, WEBSITE, IDPOST } = req.body;
    const data = await Espaco.update({
        COORDENADAS: COORDENADAS,
        WEBSITE: WEBSITE,
        IDPOST: IDPOST,
    }, { where: { IDESPACO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Espaço atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Espaço",
            error: error.message
        });
    });
}

module.exports = controller;
