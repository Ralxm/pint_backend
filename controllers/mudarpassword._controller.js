var MudarPassword = require('../model/aviso')
const controller = {};

controller.mudarPasswordCreate = async(req, res) => {
    const { EMAIL, CODIGO } = req.body;
    const data = await MudarPassword.create({
        EMAIL: EMAIL,
        CODIGO: CODIGO,
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

controller.mudarPasswordList = async(req, res) => {
    const data = await MudarPassword.findAll({order: ['IDMUDARPASSWORD']})
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

controller.mudarPasswordGet = async(req, res) => {
    const { id } = req.params;
    const data = await MudarPassword.findOne({where: { IDMUDARPASSWORD: id }
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

controller.mudarPasswordDelete = async(req, res) =>{
    const { id } = req.params;
    const data = await MudarPassword.destroy({
        where: {IDMUDARPASSWORD: id}
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

controller.mudarPasswordUpdate = async(req, res) =>{
    const { id } = req.params;
    const { EMAIL, CODIGO } = req.body;
    const data = await MudarPassword.create({
        EMAIL: EMAIL,
        CODIGO: CODIGO,
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
