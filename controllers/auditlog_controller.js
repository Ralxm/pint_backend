var AuditLog = require('../model/auditlog')
const controller = {};
controller.auditlogCreate = auditlogCreate;
controller.auditlogList = auditlogList;
controller.auditlogGet = auditlogGet;
controller.auditlogDelete = auditlogDelete;
controller.auditlogUpdate = auditlogUpdate;

async function auditlogCreate(req, res){
    const { IDCONTA, TIPOATIVIDADE, DATA, DESCRICAO } = req.body;
    const data = await AuditLog.create({
        IDCONTA: IDCONTA,
        TIPOATIVIDADE: TIPOATIVIDADE,
        DATA: DATA,
        DESCRICAO: DESCRICAO,
    })
    .then(function(data){
        res.status(200).json({
            success: true,
            message: "Audit Log Criada",
            data: data
        })
    })
    .catch(error =>
        res.status(500).json({
            success: false,
            message: "Erro a criar o Audit Log",
            error: error.message
        })
    )
}

async function auditlogList(req, res){
    const data = await AuditLog.findAll({order: ['LOGID']})
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

async function auditlogGet(req, res){
    const { id } = req.params;
    const data = await AuditLog.findAll({
        where: { LOGID: id }
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
            message: "Erro a encontrar o auditlog",
            error: error
        });
    })
}

async function auditlogDelete(req, res){
    const { id } = req.params;
    const data = await AuditLog.destroy({
        where: {LOGID: id}
    })
    .then(function() {
        res.status(200).json({
            success: true,
            message: "AuditLog Apagado"
        })
    })
    .catch(error => {
        res.status(500).json({
            success: false,
            message: "Erro a apagar o AuditLog",
            error: error.message
        });
    })
}

async function auditlogUpdate(req, res){
    const { id } = req.params;
    const { IDCONTA, TIPOATIVIDADE, DATA, DESCRICAO  } = req.body;
    const data = await AuditLog.update({
        IDCONTA: IDCONTA,
        TIPOATIVIDADE: TIPOATIVIDADE,
        DATA: DATA,
        DESCRICAO: DESCRICAO,
    },{ where: { LOGID: id}})
    .then(function(data) {
        res.status(200).json
        ({
            success: true,
            data: data,
            message: "AuditLog atualizada com sucesso!"
        });
    })
    .catch(function(error) {
        console.error('Error updating AuditLog:', error);
        res.status(500).json({
            success: false,
            message: "Erro a atualizar o auditlog",
            error: error.message
        });
    })
}

module.exports = controller;