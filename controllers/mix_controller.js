var Questionario  = require('../model/questionario')
var Opcoes_escolha = require('../model/opcoes_escolha')
var Voto = require('../model/voto')
var Colaborador = require('../model/colaborador')
var Cidade = require('../model/cidade')
var Subcategoria = require('../model/subcategoria');
var Categoria = require('../model/categoria')
var Post = require('../model/post')
const controller = {};

controller.getEverythingMobile = async (req, res) => {
    const post = await Post.findAll({attributes: ['IDPUBLICACAO'], order: ['IDPUBLICACAO']})
    const categoria = await Categoria.findAll({attributes: ['IDCATEGORIA'], order: ['IDCATEGORIA']})
    const subcategoria = await Subcategoria.findAll({attributes: ['IDSUBCATEGORIA'], order: ['IDSUBCATEGORIA']})
    const cidade = await Cidade.findAll({attributes: ['IDCIDADE'], order: ['IDCIDADE']})
    const colaborador = await Colaborador.findAll({attributes: ['IDCOLABORADOR'], order: ['IDCOLABORADOR']})
    const voto = await Voto.findAll({attributes: ['IDVOTO'], order: ['IDVOTO']})
    const opcoes_escolha = await Opcoes_escolha.findAll({attributes: ['IDOPCAO'], order: ['IDOPCAO']})
    const questionario = await Questionario.findAll({attributes: ['IDQUESTIONARIO'], order: ['IDQUESTIONARIO']})
    try{
        res.status(200).json({
            success: true,
            post: post,
            categoria: categoria,
            subcategoria: subcategoria,
            cidade: cidade,
            colaborador: colaborador,
            voto: voto,
            opcoes_escolha: opcoes_escolha,
            questionario: questionario,
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Erro a listar",
            error: err.message
        });
    }
}


module.exports = controller;