var Categoria = require('../model/categoria')
var Subcategoria = require('../model/subcategoria')
const controller = {};
controller.subcategoriaCreate = subcategoriaCreate;
controller.subcategoriaList = subcategoriaList;
controller.subcategoriaListByID = subcategoriaListByID;
controller.subcategoriaGet = subcategoriaGet;
controller.subcategoriaDelete = subcategoriaDelete;
controller.subcategoriaUpdate = subcategoriaUpdate;

async function subcategoriaCreate(req, res){
    const { NOME, DESCRICAO, IDCATEGORIA } = req.body;
    const data = await Subcategoria.create({
        NOME: NOME,
        DESCRICAO: DESCRICAO,
        IDCATEGORIA: IDCATEGORIA,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Subcategoria Criada",
            data: data
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a criar a Subcategoria",
            error: error.message
        })
    })
}

async function subcategoriaList(req, res){
    const data = await Subcategoria.findAll({include: [Categoria], order: ['IDSUBCATEGORIA']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar as subcategorias",
            error: error.message
        });
    });
}

async function subcategoriaListByID(req, res){
    const { id } = req.params;
    const data = await Subcategoria.findAll({where : {IDCATEGORIA : id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a listar as subcategorias",
            error: error.message
        });
    });
}

async function subcategoriaGet(req, res){
    const { id } = req.params;
    const data = await Subcategoria.findAll({
        where: { IDSUBCATEGORIA: id }
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
            message: "Erro a encontrar as subcategorias",
            error: error
        });
    })
}

async function subcategoriaDelete(req, res){
    const { id } = req.params;
    const data = await Subcategoria.destroy({
        where: {IDSUBCATEGORIA: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Subcategoria Apagado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar a subcategoria",
            error: error.message
        });
    })
}

async function subcategoriaUpdate(req, res){
    const { id } = req.params;
    const { NOME, DESCRICAO, IDCATEGORIA } = req.body;
    const data = await Subcategoria.update({
        NOME: NOME,
        DESCRICAO: DESCRICAO,
        IDCATEGORIA: IDCATEGORIA,
    },{ where: { IDSUBCATEGORIA: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            data: data,
            message: "Subcategoria atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro a atualizar a subcategoria",
            error: error.message
        });
    })
}

module.exports = controller;