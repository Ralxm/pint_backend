var Colaborador = require('../model/colaborador')
var Colaborador_Cargo = require('../model/colaborador_cargo'); 
const controller = {};

controller.colaboradorCargoCreate = colaboradorCargoCreate;
controller.colaboradorCargoList = colaboradorCargoList;
controller.colaboradorCargoGet = colaboradorCargoGet;
controller.colaboradorCargoGetByColaborador = colaboradorCargoGetByColaborador;
controller.colaboradorCargoDelete = colaboradorCargoDelete;
controller.colaboradorCargoUpdate = colaboradorCargoUpdate;

async function colaboradorCargoCreate(req, res) {
    const { IDCARGO, IDCOLABORADOR } = req.body; 
    const data = await Colaborador_Cargo.create({
        IDCARGO: IDCARGO,
        IDCOLABORADOR: IDCOLABORADOR,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Colaborador Cargo Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Colaborador Cargo",
            error: error.message
        })
    })
}

async function colaboradorCargoList(req, res) {
    const data = await Colaborador_Cargo.findAll({order: ['IDCOLABORADORCARGO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar os Colaboradores Cargo",
            error: error.message
        });
    });
}

async function colaboradorCargoGet(req, res) {
    const { id } = req.params;
    const data = await Colaborador_Cargo.findAll({
        where: { IDCOLABORADORCARGO: id }
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
            message: "Erro ao encontrar o Colaborador Cargo",
            error: error.message
        });
    });
}

async function colaboradorCargoGetByColaborador(req, res) {
    const { id } = req.params;
    const data = await Colaborador_Cargo.findAll({
        where: { IDCOLABORADOR: id }
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
            message: "Erro ao encontrar o Colaborador Cargo",
            error: error.message
        });
    });
}

async function colaboradorCargoDelete(req, res) {
    const { id } = req.params;
    const data = await Colaborador_Cargo.destroy({
        where: { IDCOLABORADORCARGO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Colaborador Cargo Apagado"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar o Colaborador Cargo",
            error: error.message
        });
    });
}

async function colaboradorCargoUpdate(req, res) {
    const { id } = req.params;
    const { IDCARGO, IDCOLABORADOR } = req.body;
    const data = await Colaborador_Cargo.update({
        IDCARGO: IDCARGO,
        IDCOLABORADOR: IDCOLABORADOR,
    }, { where: { IDCOLABORADORCARGO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Colaborador Cargo atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Colaborador Cargo",
            error: error.message
        });
    });
}

module.exports = controller;
