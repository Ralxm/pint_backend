var Questionario  = require('../model/questionario')
var Opcoes_escolha = require('../model/opcoes_escolha')
var Voto = require('../model/voto')
var Colaborador = require('../model/colaborador')
var Cidade = require('../model/cidade')
var Subcategoria = require('../model/subcategoria');
var Categoria = require('../model/categoria')
var Post = require('../model/post')
var Espaco = require('../model/espaco')
var Evento = require('../model/evento')
var Comentario = require('../model/comentario')
var Aprovacao = require('../model/aprovacao')
const controller = {};

controller.getEverythingMobile = async (req, res) => {
    const { idcidade }  = req.params
    const post = await Post.findAll({attributes: ['IDPUBLICACAO'], order: ['IDPUBLICACAO'],
        where: {CIDADE : idcidade}
    })
    const categoria = await Categoria.findAll({attributes: ['IDCATEGORIA'], order: ['IDCATEGORIA']})
    const subcategoria = await Subcategoria.findAll({attributes: ['IDSUBCATEGORIA'], order: ['IDSUBCATEGORIA']})
    const cidade = await Cidade.findAll({attributes: ['IDCIDADE'], order: ['IDCIDADE']})
    const colaborador = await Colaborador.findAll({attributes: ['IDCOLABORADOR'], order: ['IDCOLABORADOR']})
    const voto = await Voto.findAll({attributes: ['IDVOTO'], order: ['IDVOTO']})
    const opcoes_escolha = await Opcoes_escolha.findAll({attributes: ['IDOPCAO'], order: ['IDOPCAO']})
    const questionario = await Questionario.findAll({attributes: ['IDQUESTIONARIO'], order: ['IDQUESTIONARIO']})
    const posts = post.map(postt => {
        if (postt.IMAGEM) {
            postt.IMAGEM = postt.IMAGEM.toString('base64');
        }
        return postt;
    });
    try{
        res.status(200).json({
            success: true,
            post: posts,
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

controller.mainPage = async (req, res) => {
    const { idcidade }  = req.params
    const colaborador = await Colaborador.findAll({include: [Cidade], order: ['IDCOLABORADOR'], where: {CIDADE : idcidade}})
    const categoria = await Categoria.findAll({order: ['IDCATEGORIA']})
    const subcategoria = await Subcategoria.findAll({include: [Categoria], order: ['IDSUBCATEGORIA']})
    const post = await Post.findAll({include: [Evento, Espaco, Categoria, Subcategoria, Aprovacao, Cidade, Colaborador], order: ['IDPUBLICACAO'],
        where: {CIDADE : idcidade}
    })
    const espaco = await Espaco.findAll({order: ['IDESPACO']})
    const evento = await Evento.findAll({order: ['IDEVENTO']})
    const comentario = await Comentario.findAll({include: [Aprovacao, Colaborador], order: ['IDCOMENTARIO']})

    const posts = post.map(postt => {
        if (postt.IMAGEM) {
            postt.IMAGEM = postt.IMAGEM.toString('base64');
        }
        return postt;
    });

    try{
        res.status(200).json({
            success: true,
            post: posts,
            categoria: categoria,
            subcategoria: subcategoria,
            colaborador: colaborador,
            espaco: espaco,
            evento: evento,
            comentario: comentario,
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