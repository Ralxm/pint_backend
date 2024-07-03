var Permissoes = require('../model/permissoes');
const controller = {};

controller.permissoesCreate = permissoesCreate;
controller.permissoesList = permissoesList;
controller.permissoesGet = permissoesGet;
controller.permissoesDelete = permissoesDelete;
controller.permissoesUpdate = permissoesUpdate;

async function permissoesCreate(req, res) {
    const { NOME, DESCRICAO } = req.body;
    const data = await Permissoes.create({
        NOME: NOME,
        DESCRICAO: DESCRICAO
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Permissões Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Permissões",
            error: error.message
        })
    })
}

async function permissoesList(req, res) {
    const data = await Permissoes.findAll({order: ['IDPERMISSAO']})
    .then(data => {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as Permissões",
            error: error.message
        });
    });
}

async function permissoesGet(req, res) {
    const { id } = req.params;
    const data = await Evento.findAll({where : {IDPERMISSAO : id}})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao encontrar a Permissão",
            error: error.message
        });
    });
}

async function permissoesDelete(req, res) {
    const { id } = req.params;
    const data = await Permissoes.destroy({
        where: { IDPERMISSAO: id }
    })
    .then(() => {
        res.status(200).json({
            success: true,
            message: "Permissão apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar a Permissão",
            error: error.message
        });
    });
}

async function permissoesUpdate(req, res) {
    const { id } = req.params;
    const { NOME, DESCRICAO } = req.body;
    const data = await Permissoes.update({
        NOME: NOME,
        DESCRICAO: DESCRICAO
    }, { where: { IDPERMISSAO: id }})
    .then(() => {
        res.status(200).json({
            success: true,
            message: "Permissão atualizada com sucesso!"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar a Permissão",
            error: error.message
        });
    });
}

module.exports = controller;



