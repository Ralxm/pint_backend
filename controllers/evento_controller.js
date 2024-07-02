var Evento = require('../model/evento');
const controller = {};

controller.eventoCreate = eventoCreate;
controller.eventoList = eventoList;
controller.eventoGet = eventoGet;
controller.eventoDelete = eventoDelete;
controller.eventoUpdate = eventoUpdate;

async function eventoCreate(req, res) {
    const { IDQUESTIONARIO, IDPOST } = req.body;
    const data = await Evento.create({
        IDQUESTIONARIO: IDQUESTIONARIO,
        IDPOST: IDPOST,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Evento Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Evento",
            error: error.message
        })
    })
}

async function eventoList(req, res) {
    const data = await Evento.findAll({order: ['IDEVENTO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar os Eventos",
            error: error.message
        });
    });
}

async function eventoGet(req, res) {
    const { IDEVENTO } = req.params;
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
            message: "Erro ao encontrar o Evento",
            error: error.message
        });
    });
}

async function eventoDelete(req, res) {
    const { id } = req.params;
    const data = await Evento.destroy({
        where: { IDEVENTO: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Evento Apagado"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar o Evento",
            error: error.message
        });
    });
}

async function eventoUpdate(req, res) {
    const { id } = req.params;
    const { IDQUESTIONARIO, IDPOST } = req.body;
    const data = await Evento.update({
        IDQUESTIONARIO: IDQUESTIONARIO,
        IDPOST: IDPOST,
    }, { where: { IDEVENTO: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Evento atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Evento",
            error: error.message
        });
    });
}

module.exports = controller;
