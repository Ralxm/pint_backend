const express = require('express');
const app = express();
const sequelize = require('./model/database');
const Sequelize = require('sequelize')
const middleware = require('./middleware')

const Aprovacao = require('./routes/aprovacao_routes');
const Auditlog = require('./routes/auditlog_routes');
const Cargo_permissao = require('./routes/cargo_permissao_routes');
const Cargo = require('./routes/cargo_routes');
const Categoria = require('./routes/categoria_routes.js');
const Cidade = require('./routes/cidade_routes');
const Colaborador_cargo = require('./routes/colaborador_cargo_routes');
const Colaborador = require('./routes/colaborador_routes')
const Comentario = require('./routes/comentario_routes');
const Edicao_comentario = require('./routes/edicao_comentario_routes');
const Edicao_publicacao = require('./routes/edicao_publicacao_routes');
const Espaco = require('./routes/espaco_routes');
const Evento = require('./routes/evento_routes');
const Opcoes_escolha = require('./routes/opcoes_escolha_routes');
const Permissoes = require('./routes/permissoes_routes');
const Post = require('./routes/post_routes');
const Questionario = require('./routes/questionario_routes');
const Subcategoria = require('./routes/subcategoria_routes');
const Voto = require('./routes/voto_routes');
const RawQuery = require('./routes/rawquery.js')

const _Auditlog = require('./model/auditlog');
const _Cidade = require('./model/cidade');
const _Cargo = require('./model/cargo');
const _Permissoes = require('./model/permissoes');
const _Categoria = require('./model/categoria');
const _Subcategoria = require('./model/subcategoria');
const _Colaborador = require('./model/colaborador');
const _Espaco = require('./model/espaco');
const _Questionario = require('./model/questionario');
const _Opcoes_escolha = require('./model/opcoes_escolha');
const _Aprovacao = require('./model/aprovacao');
const _Evento = require('./model/evento');
const _Post = require('./model/post');
const _Comentario = require('./model/comentario');
const _Cargo_permissao = require('./model/cargo_permissao');
const _Colaborador_cargo = require('./model/colaborador_cargo');
const _Voto = require('./model/voto');
const _Edicao_comentario = require('./model/edicao_comentario');
const _Edicao_publicacao = require('./model/edicao_publicacao');

app.set('port', process.env.PORT || 3001);

//_Colaborador_cargo.belongsTo(Cargo, { foreignKey: 'IDCARGO' });
//_Colaborador_cargo.belongsTo(Colaborador, { foreignKey: 'IDCOLABORADOR' });

//Cargo.hasMany(_Colaborador_cargo, { foreignKey: 'IDCARGO' });
//Colaborador.hasMany(_Colaborador_cargo, { foreignKey: 'IDCOLABORADOR' });

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await _Auditlog.sync();
        await _Cidade.sync();
        await _Espaco.sync();
        await _Cargo.sync();
        await _Permissoes.sync();
        await _Categoria.sync();
        await _Subcategoria.sync();
        await _Colaborador.sync();
        await _Cargo_permissao.sync();
        await _Colaborador_cargo.sync();
        await _Aprovacao.sync();
        await _Questionario.sync();
        await _Opcoes_escolha.sync();
        await _Voto.sync();
        await _Comentario.sync(); 
        await _Edicao_comentario.sync();
        await _Evento.sync();
        await _Post.sync();
        await _Edicao_publicacao.sync();

        let id;
        const cidadeCount = await _Cidade.count();
        if(cidadeCount == 0){
            const cidade = await _Cidade.create({
                NOME: 'Lisboa'
            });
            id = cidade.IDCIDADE;
        }
        
        const colaboradorCount = await _Colaborador.count();
        if(colaboradorCount == 0){
            const colaborador = await _Colaborador.create({
                EMAIL: '123',
                PASSWORDCOLABORADOR: "123",
                NOME: 'Administrador',
                TELEMOVEL: '123456789',
                CIDADE: id,
                DATANASCIMENTO: '1990-01-01',
                DATAREGISTO: new Date(),
                ULTIMOLOGIN: new Date()
            });

            const cargo = await _Cargo.create({
                NOME: 'Administrador',
                DESCRICAO: 'Utilizador com permissões totais'
            })

            const colaborador_cargo = await _Colaborador_cargo.create({
                IDCARGO: cargo.IDCARGO,
                IDCOLABROADOR: colaborador.IDCOLABORADOR
            })
        }

        const eventoCount = await _Evento.count();
        if(eventoCount == 0){
            const questionario = await _Questionario.create({
                NOME: 'teste'
            })
            const evento = await _Evento.create({
                IDQUESTIONARIO: questionario.IDQUESTIONARIO
            });
        }

        const espacoCount = await _Espaco.count();
        if(espacoCount == 0){
            const espaco = await _Espaco.create({
                COORDENADAS: 'teste',
                WEBSITE: 'teste'
            });
        }

        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

syncDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/aprovacao', Aprovacao);
app.use('/auditlog', Auditlog);
app.use('/cargo_permissao',Cargo_permissao);
app.use('/cargo', Cargo);
app.use('/categoria', Categoria);
app.use('/cidade', Cidade);
app.use('/colaborador_cargo', Colaborador_cargo);
app.use('/colaborador', Colaborador);
app.use('/comentario', Comentario);
app.use('/edicao_comentario', Edicao_comentario);
app.use('/edicao_publicacao', Edicao_publicacao);
app.use('/espaco', Espaco);
app.use('/evento', Evento);
app.use('/opcoes_escolha', Opcoes_escolha);
app.use('/permissoes', Permissoes);
app.use('/post', Post);
app.use('/questionario', Questionario);
app.use('/subcategoria', Subcategoria);
app.use('/voto', Voto);
app.use('rawquery', RawQuery);

app.get('/test', (req, res)=>{
    res.send("A funcionar!");
})

app.listen(app.get('port'), ()=>{
    console.log('Start server on port ' + app.get('port'));
})