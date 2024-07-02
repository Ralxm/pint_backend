var Questionario = require('../model/questionario')
var Evento = require('../model/evento')
const controller = {};
controller.questionarioCreate = questionarioCreate;
controller.questionarioList = questionarioList;
controller.questionarioGet = questionarioGet;
controller.questionarioDelete = questionarioDelete;
controller.questionarioUpdate = questionarioUpdate;

async function questionarioCreate(req, res){
    const { NOME, IDEVENTO } = req.body;
    const data = await Questionario.create({
        NOME: NOME,
        IDEVENTO: IDEVENTO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Questionário Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Questionário",
            error: error.message
        })
    })
}

async function questionarioList(req, res){
    const data = await Questionario.findAll({include: [Evento], order: ['IDQUESTIONARIO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar os questionários",
            error: error.message
        });
    });
}

async function questionarioGet(req, res){
    const { IDQUESTIONARIO } = req.params;
    const data = await Questionario.findAll({
        where: { IDQUESTIONARIO: IDQUESTIONARIO }
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
            message: "Erro a encontrar os questionários",
            error: error
        });
    })
}

async function questionarioDelete(req, res){
    const { id } = req.params;
    const data = await Questionario.destroy({
        where: {IDQUESTIONARIO: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Questionário Apagado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar o Questionário",
            error: error.message
        });
    })
}

async function questionarioUpdate(req, res){
    const { id } = req.params;
    const { NOME, IDEVENTO } = req.body;
    const data = await Questionario.update({
        NOME: NOME,
        IDEVENTO: IDEVENTO,
    },{ where: { IDQUESTIONARIO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            data: data,
            message: "Questionário atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar o Questionário",
            error: error.message
        });
    })
}

module.exports = controller;
