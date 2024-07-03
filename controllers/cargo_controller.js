var Cargo = require('../model/cargo');
const controller = {};

controller.cargoCreate = cargoCreate;
controller.cargoList = cargoList;
controller.cargoGet = cargoGet;
controller.cargoDelete = cargoDelete;
controller.cargoUpdate = cargoUpdate;

async function cargoCreate(req, res) {
    const { NOME, DESCRICAO } = req.body;
    const data = await Cargo.create({
        NOME: NOME,
        DESCRICAO: DESCRICAO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Cargo Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o cargo",
            error: error.message
        })
    })
}

async function cargoList(req, res) {
    const data = await Cargo.findAll({order: ['IDCARGO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar os cargos",
            error: error.message
        });
    });
}

async function cargoGet(req, res) {
    const { id } = req.params;
    const data = await Cargo.findAll({
        where: { IDCARGO: id }
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
            message: "Erro a encontrar o cargo",
            error: error.message
        });
    });
}

async function cargoDelete(req, res) {
    const { id } = req.params;
    const data = await Cargo.destroy({
        where: { IDCARGO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Cargo Apagado"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar o Cargo",
            error: error.message
        });
    });
}

async function cargoUpdate(req, res) {
    const { id } = req.params;
    const { NOME, DESCRICAO } = req.body;
    const data = await Cargo.update({
        NOME: NOME,
        DESCRICAO: DESCRICAO,
    }, { where: { IDCARGO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Cargo atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar o cargo",
            error: error.message
        });
    });
}

module.exports = controller;
