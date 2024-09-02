var Colaborador = require('../model/colaborador')
var Opcoes_Escolha = require('../model/opcoes_escolha')
var Voto = require('../model/voto')
const controller = {};
controller.votoCreate = votoCreate;
controller.votoList = votoList;
controller.votoGet = votoGet;
controller.votoDelete = votoDelete;
controller.votoUpdate = votoUpdate;

async function votoCreate(req, res){
    const { IDCOLABORADOR, DATAVOTO, IDOPCOESESCOLHA } = req.body;
    const data = await Voto.create({
        IDCOLABORADOR: IDCOLABORADOR,
        DATAVOTO: DATAVOTO,
        IDOPCOESESCOLHA: IDOPCOESESCOLHA,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Voto Criado",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Voto",
            error: error.message
        })
    })
}

async function votoList(req, res){
    const data = await Voto.findAll({include: [Opcoes_Escolha, Colaborador], order: ['IDVOTO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar os votos",
            error: error.message
        });
    });
}

async function votoGet(req, res){
    const { id } = req.params;
    const data = await Voto.findAll({
        where: { IDVOTO: id }
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
            message: "Erro a encontrar os votos",
            error: error
        });
    })
}

async function votoDelete(req, res){
    const { id } = req.params;
    const data = await Voto.destroy({
        where: {IDVOTO: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Voto Apagado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar o voto",
            error: error.message
        });
    })
}

async function votoUpdate(req, res){
    const { id } = req.params;
    const { IDCOLABORADOR, DATAVOTO, IDOPCOESESCOLHA } = req.body;
    const data = await Voto.update({
        IDCOLABORADOR: IDCOLABORADOR,
        DATAVOTO: DATAVOTO,
        IDOPCOESESCOLHA: IDOPCOESESCOLHA,
    },{ where: { IDVOTO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            data: data,
            message: "Voto atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar o voto",
            error: error.message
        });
    })
}

controller.votoGetByOpcao = async (req, res) => {
    const { id } = req.params;
    const data = await Voto.findAll({
        where: { IDOPCOESESCOLHA: id }
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
            message: "Erro a encontrar os votos",
            error: error
        });
    })
}

module.exports = controller;