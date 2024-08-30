var Aviso = require('../model/aviso')
const controller = {};


controller.avisoCreate = async(req, res) => {
    const { COLABORADOR, ADMINISTRADOR, DATAAVISO, TEXTO } = req.body;
    const data = await Aviso.create({
        COLABORADOR: COLABORADOR,
        ADMINISTRADOR: ADMINISTRADOR,
        DATAAVISO: DATAAVISO,
        TEXTO: TEXTO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Aviso Criado",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Aviso",
            error: error.message
        })
    })
}

controller.avisoList = async(req, res) => {
    const data = await Aviso.findAll({order: ['IDAVISO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar os avisos",
            error: error.message
        });
    });
}

controller.avisoGet = async(req, res) => {
    const { id } = req.params;
    const data = await Aviso.findOne({where: { IDAVISO: id }
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
            message: "Erro a encontrar o Aviso",
            error: error
        });
    })
}

controller.avisoDelete = async(req, res) =>{
    const { id } = req.params;
    const data = await Aviso.destroy({
        where: {IDAVISO: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Aviso Apagado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar o Aviso",
            error: error.message
        });
    })
}

controller.avisoUpdate = async(req, res) =>{
    const { id } = req.params;
    const { COLABORADOR, ADMINISTRADOR, DATAAVISO, TEXTO } = req.body;
    const data = await Aviso.update({
        COLABORADOR: COLABORADOR,
        ADMINISTRADOR: ADMINISTRADOR,
        DATAAVISO: DATAAVISO,
        TEXTO: TEXTO,
    }, {where: { IDAVISO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            message: "Aviso atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar o Aviso",
            error: error.message
        });
    })
}


module.exports = controller;
