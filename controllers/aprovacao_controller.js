var Colaborador = require('../model/colaborador')
var Aprovacao = require('../model/aprovacao')
const controller = {};
controller.aprovacaoCreate = aprovacaoCreate;
controller.aprovacaoList = aprovacaoList;
controller.aprovacaoGet = aprovacaoGet;
controller.aprovacaoDelete = aprovacaoDelete;
controller.aprovacaoUpdate = aprovacaoUpdate;

async function aprovacaoCreate(req, res){
    const {IDCOLABORADOR, DATAAPROVACAO, APROVADA } = req.body;
    const data = await Aprovacao.create({
        IDCOLABORADOR: IDCOLABORADOR,
        DATAAPROVACAO: DATAAPROVACAO,
        APROVADA: APROVADA,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Aprovação Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar a aprovação",
            error: error.message
        })
    })
}

async function aprovacaoList(req, res){
    const data = await Aprovacao.findAll({order: ['IDAPROVACAO']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar as aprovações",
            error: error.message
        });
    });
}

async function aprovacaoGet(req, res){
    const { IDAPROVACAO } = req.params;
    const data = await Aprovacao.findAll({
        include: [Colaborador],
        where: { IDAPROVACAO: IDAPROVACAO }
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
            message: "Erro a encontrar a aprovação",
            error: error
        });
    })
}

async function aprovacaoDelete(req, res){
    const { id } = req.params;
    const data = await Aprovacao.destroy({
        where: {IDAPROVACAO: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Aprovação Apagada"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar a Aprovação",
            error: error.message
        });
    })
}

async function aprovacaoUpdate(req, res){
    const { id } = req.params;
    const { IDCOLABORADOR, DATAAPROVACAO, APROVADA } = req.body;
    const data = await Aprovacao.update({
        IDCOLABORADOR: IDCOLABORADOR,
        DATAAPROVACAO: DATAAPROVACAO,
        APROVADA: APROVADA,
    },{ where: { IDAPROVACAO: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            data: data,
            message: "Aprovação atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar a aprovação",
            error: error.message
        });
    })
}

module.exports = controller;
