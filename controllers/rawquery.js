var Questionario = require('../model/questionario')
var Evento = require('../model/evento')
const controller = {};

controller.query = query;

async function query(req, res){
    const { QUERY } = req.body;
    const data = await sequelize.query(QUERY)
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

module.exports = controller;
