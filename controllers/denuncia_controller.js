var Denuncia = require('../model/denuncia')
const controller = {};

controller.denunciaCreate = async(req, res) => {
    const { COLABORADOR, COMENTARIO, DATADENUNCIA, MOTIVO } = req.body;
    const data = await Denuncia.create({
        COLABORADOR: COLABORADOR,
        COMENTARIO: COMENTARIO,
        DATADENUNCIA: DATADENUNCIA,
        MOTIVO: MOTIVO,
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
            message: "Erro a criar a denuncia",
            error: error.message
        })
    })
}

controller.denunciaList = async(req, res) => {
    const data = await Denuncia.findAll({order: ['IDDENUNCIA']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar as denuncias",
            error: error.message
        });
    });
}

controller.denunciaListByCidade = async(req, res) => {
    const { id } = req.params
    const data = await Denuncia.findAll({order: ['IDDENUNCIA'], where: {CIDADE: id}})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar as denuncias",
            error: error.message
        });
    });
}

controller.denunciaGet = async(req, res) => {
    const { id } = req.params;
    const data = await Denuncia.findOne({where: { IDDENUNCIA: id }
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
            message: "Erro a encontrar a denuncia",
            error: error
        });
    })
}

controller.denunciaDelete = async(req, res) =>{
    const { id } = req.params;
    const data = await Denuncia.destroy({
        where: {IDDENUNCIA: id}
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
            message: "Erro a apagar a denuncia",
            error: error.message
        });
    })
}

controller.denunciaUpdate = async(req, res) =>{
    const { id } = req.params;
    const { COLABORADOR, COMENTARIO, DATADENUNCIA, MOTIVO } = req.body;
    const data = await Denuncia.update({
        COLABORADOR: COLABORADOR,
        COMENTARIO: COMENTARIO,
        DATADENUNCIA: DATADENUNCIA,
        MOTIVO: MOTIVO,
    }, {where: { IDDENUNCIA: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            message: "Denuncia atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar a Denuncia",
            error: error.message
        });
    })
}

module.exports = controller;
