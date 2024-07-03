var Cargo = require('../model/cargo')
var Permissoes = require('../model/permissoes')
var Cargo_Permissao = require('../model/cargo_permissao');
const CargoPermissao = require('../model/cargo_permissao');
const controller = {};

controller.cargoPermissaoCreate = cargoPermissaoCreate;
controller.cargoPermissaoList = cargoPermissaoList;
controller.cargoPermissaoGet = cargoPermissaoGet;
controller.cargoPermissaoDelete = cargoPermissaoDelete;
controller.cargoPermissaoUpdate = cargoPermissaoUpdate;

async function cargoPermissaoCreate(req, res) {
    const { IDCARGO, IDPERMISSAO } = req.body;
    const data = await Cargo_Permissao.create({
        IDCARGO: IDCARGO,
        IDPERMISSAO: IDPERMISSAO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Cargo Permissão Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Cargo Permissão",
            error: error.message
        })
    })
}

async function cargoPermissaoList(req, res) {
    const data = await Cargo_Permissao.findAll({include: [Cargo, Permissoes], order: ['IDCARGOPERMISSAO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as permissões de cargo",
            error: error.message
        });
    });
}

async function cargoPermissaoGet(req, res) {
    const { id } = req.params;
    const data = await Cargo_Permissao.findAll({
        where: { IDCARGOPERMISSAO: id }
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
            message: "Erro ao encontrar o Cargo Permissao",
            error: error.message
        });
    });
}

async function cargoPermissaoDelete(req, res) {
    const { id } = req.params;
    const data = await Cargo_Permissao.destroy({
        where: { IDCARGOPERMISSAO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Cargo Permissao Apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar o Cargo Permissao",
            error: error.message
        });
    });
}

async function cargoPermissaoUpdate(req, res) {
    const { id } = req.params;
    const { IDCARGO, IDPERMISSAO } = req.body;
    const data = await Cargo_Permissao.update({
        IDCARGO: IDCARGO,
        IDPERMISSAO: IDPERMISSAO,
    }, { where: { IDCARGOPERMISSAO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Cargo Permissao atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Cargo Permissao",
            error: error.message
        });
    });
}

module.exports = controller;
