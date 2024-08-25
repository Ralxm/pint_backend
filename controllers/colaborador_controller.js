const multer = require('multer');
var Colaborador = require('../model/colaborador');
var Cidade = require('../model/cidade');
var Cargo = require('../model/cargo');
var ColaboradorCargo = require('../model/colaborador_cargo');
const controller = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../model/database');
const config = require('../config')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('IMAGEM');

controller.colaboradorLogin = colaboradorLogin;
controller.colaboradorCreate = colaboradorCreate;
controller.colaboradorList = colaboradorList;
controller.colaboradorGet = colaboradorGet;
controller.colaboradorDelete = colaboradorDelete;
controller.colaboradorUpdate = colaboradorUpdate;
controller.colaboradorGetByEmail = colaboradorGetByEmail;

async function colaboradorLogin(req, res) {
    if(req.body.email && req.body.password){
        var email = req.body.email;
        var password = req.body.password;
    }
    console.log("password: " + password)
    console.log("email: " + email)
    var user = await Colaborador.findOne({where: { EMAIL: email }})
    .then(function(data){
        return data;
    })
    .catch(error =>{
        console.log("Erro: " + error);
        return error;
    })
    console.log(data)
    if (password === null || typeof password === "undefined") {
        res.status(403).json({
        success: false,
        message: 'Campos em Branco'
        });
    }
    else {
        console.log(req.body.email)
        console.log(req.body.password)
        console.log(user)
        if (req.body.email && req.body.password && user) {
            const isMatch = bcrypt.compareSync(password, user.PASSWORDCOLABORADOR);
            if (req.body.email === user.EMAIL && isMatch) {
                let token = jwt.sign({
                    EMAIL: req.body.email
                    },
                    config.jwtSecret
                );
                user.ULTIMOLOGIN = new Date();
                let colaboradorCargo = await ColaboradorCargo.findOne({where: {IDCOLABORADOR: user.IDCOLABORADOR}})
                let cargo = await Cargo.findOne({where: {IDCARGO:colaboradorCargo.IDCARGO}})

                await user.save();
                res.json({
                    success: true,
                    message: 'Autenticação realizada comsucesso!',
                    token: token,
                    id: user.IDCOLABORADOR,
                    cidade: user.CIDADE,
                    cargo: cargo.IDCARGO,
                });
            } 
            else {
                res.status(403).json({
                    success: false,
                    message: 'Dados de autenticação inválidos.'
                });
            }} 
            else {
            res.status(400).json({
                success: false,
                message: 'Erro no processo deautenticação. Tente de novo mais tarde.'
            });
        }
    }
}

async function colaboradorCreate(req, res) {
    const { EMAIL, PASSWORDCOLABORADOR, NOME, TELEMOVEL, CIDADE, DATANASCIMENTO, DATAREGISTO, ULTIMOLOGIN, TIPOCONTA, CARGO } = req.body;

    try {
        const data = await Colaborador.create({
            EMAIL: EMAIL,
            PASSWORDCOLABORADOR: PASSWORDCOLABORADOR,
            NOME: NOME,
            TELEMOVEL: TELEMOVEL,
            CIDADE: CIDADE,
            DATANASCIMENTO: DATANASCIMENTO,
            DATAREGISTO: DATAREGISTO,
            ULTIMOLOGIN: ULTIMOLOGIN,
            TIPOCONTA: TIPOCONTA,
        });

        await ColaboradorCargo.create({
            IDCARGO: CARGO,
            IDCOLABORADOR: data.IDCOLABORADOR
        });

        res.status(200).json({
            success: true,
            message: "Colaborador Criado",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro a criar o Colaborador",
            error: error.message
        });
    }
}

async function colaboradorList(req, res) {
    const data = await Colaborador.findAll({include: [Cidade], order: ['IDCOLABORADOR']})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao listar os Colaboradores",
            error: error.message
        });
    });
}

async function colaboradorGet(req, res) {
    const { id } = req.params;
    const data = await Colaborador.findOne({
        where: { IDCOLABORADOR: id }, include: [Cidade]
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
            message: "Erro ao encontrar o Colaborador",
            error: error.message
        });
    });
}

async function colaboradorDelete(req, res) {
    const { id } = req.params;
    const data = await Colaborador.destroy({
        where: { IDCOLABORADOR: id }
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "Colaborador Apagado"
        });
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro ao apagar o Colaborador",
            error: error.message
        });
    });
}

async function colaboradorUpdate(req, res) {
    const { id } = req.params;
    const { EMAIL, PASSWORDCOLABORADOR, NOME, TELEMOVEL, CIDADE, DATANASCIMENTO, DATAREGISTO, ULTIMOLOGIN, TIPOCONTA } = req.body;
    const data = await Colaborador.update({
        EMAIL: EMAIL,
        PASSWORDCOLABORADOR: PASSWORDCOLABORADOR,
        NOME: NOME,
        TELEMOVEL:TELEMOVEL,
        CIDADE: CIDADE,
        DATANASCIMENTO: DATANASCIMENTO,
        DATAREGISTO: DATAREGISTO,
        ULTIMOLOGIN:ULTIMOLOGIN,
        TIPOCONTA: TIPOCONTA
    }, { where: { IDCOLABORADOR: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Colaborador atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Colaborador",
            error: error.message
        });
    });
}

controller.colaboradorSetImagem = async(req, res) =>{
    const { id } = req.params;
    const data = await Colaborador.update({
        IMAGEM: req.file ? req.file.buffer : null
    }, { where: { IDCOLABORADOR: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Colaborador atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Colaborador",
            error: error.message
        });
    });
}

controller.updatePassword = async(req, res) =>{
    const { id } = req.params;
    const { PASSWORDCOLABORADOR } = req.body;
    const data = await Colaborador.update({
        PASSWORDCOLABORADOR: PASSWORDCOLABORADOR
    }, { where: { IDCOLABORADOR: id }})
    .then(function(data) {
        res.status(200).json({
            success: true,
            data: data,
            message: "Colaborador atualizado com sucesso!"
        });
    })
    .catch(function(error) {
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar o Colaborador",
            error: error.message
        });
    });
}

async function colaboradorGetByEmail(req, res) {
    const { email } = req.params;
    const data = await Colaborador.findOne({
        where: { EMAIL : email }
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
            message: "Erro ao encontrar o Colaborador",
            error: error.message
        });
    });
}

module.exports = controller;
