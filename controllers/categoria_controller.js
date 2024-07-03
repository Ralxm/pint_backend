var Categoria = require('../model/categoria')
const controller = {};

controller.categoriaCreate = categoriaCreate;
controller.categoriaList = categoriaList;
controller.categoriaGet = categoriaGet;
controller.categoriaDelete = categoriaDelete;
controller.categoriaUpdate = categoriaUpdate;

async function categoriaCreate(req, res) {
    const { NOME, DESCRICAO } = req.body;
    const data = await Categoria.create({
        NOME: NOME,
        DESCRICAO:DESCRICAO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Categoria Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar a Categoria",
            error: error.message
        })
    })
}

async function categoriaList(req, res) {
    const data = await Categoria.findAll({order: ['IDCATEGORIA']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar as categorias",
            error: error.message
        });
    });
}

async function categoriaGet(req, res) {
    const { id } = req.params;
    const data = await Categoria.findAll({
        where: { IDCATEGORIA: id }
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
            message: "Erro ao encontrar a Categoria",
            error: error.message
        });
    });
}

async function categoriaDelete(req, res) {
    const { id } = req.params;
    const data = await Categoria.destroy({
        where: { IDCATEGORIA: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Categoria Apagada"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar a Categoria",
            error: error.message
        });
    });
}

async function categoriaUpdate(req, res) {
    const { id } = req.params;
    const { NOME, DESCRICAO } = req.body;
    const data = await Categoria.update({
        NOME: NOME,
        DESCRICAO:DESCRICAO,
    }, { where: { IDCATEGORIA: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Categoria atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar a Categoria",
            error: error.message
        });
    });
}

module.exports = controller;
