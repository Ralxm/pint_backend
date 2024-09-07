const express = require('express');
const app = express();
const sequelize = require('./model/database');
const Sequelize = require('sequelize')
const middleware = require('./middleware')

const Aprovacao = require('./routes/aprovacao_routes');
const Auditlog = require('./routes/auditlog_routes');
const Cargo = require('./routes/cargo_routes');
const Categoria = require('./routes/categoria_routes.js');
const Cidade = require('./routes/cidade_routes');
const Colaborador_cargo = require('./routes/colaborador_cargo_routes');
const Colaborador = require('./routes/colaborador_routes')
const Comentario = require('./routes/comentario_routes');
const Espaco = require('./routes/espaco_routes');
const Evento = require('./routes/evento_routes');
const Opcoes_escolha = require('./routes/opcoes_escolha_routes');
const Post = require('./routes/post_routes');
const Questionario = require('./routes/questionario_routes');
const Subcategoria = require('./routes/subcategoria_routes');
const Voto = require('./routes/voto_routes');
const RawQuery = require('./routes/rawquery.js')
const Mix = require('./routes/mix_routes.js')
const Aviso = require('./routes/aviso_routes.js')
const MudarPassword = require('./routes/mudarpassword_routes.js')
const Denuncia = require('./routes/denuncia_routes.js')

const _Auditlog = require('./model/auditlog');
const _Cidade = require('./model/cidade');
const _Cargo = require('./model/cargo');
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
const _Colaborador_cargo = require('./model/colaborador_cargo');
const _Voto = require('./model/voto');
const _Aviso = require('./model/aviso') 
const _MudarPassword = require('./model/mudarpassword')
const _Denuncia = require('./model/denuncia') 

app.set('port', process.env.PORT || 3001);

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        await _Auditlog.sync();
        await _Cidade.sync();
        await _Espaco.sync();
        await _Cargo.sync();
        await _Categoria.sync();
        await _Subcategoria.sync();
        await _Colaborador.sync();
        await _Colaborador_cargo.sync();
        await _Aprovacao.sync();
        await _Questionario.sync();
        await _Opcoes_escolha.sync();
        await _Voto.sync();
        await _Comentario.sync(); 
        await _Evento.sync();
        await _Post.sync();
        await _Aviso.sync();
        await _MudarPassword.sync();

        let id;
        const cidadeCount = await _Cidade.count();
        if(cidadeCount == 0){
            const cidade = await _Cidade.create({
                NOME: 'Lisboa'
            });
            id = cidade.IDCIDADE;
            await _Cidade.create({
                NOME: 'Viseu'
            });
            await _Cidade.create({
                NOME: 'Coimbra'
            });
            await _Cidade.create({
                NOME: 'Tomar'
            });
            await _Cidade.create({
                NOME: 'Vila Real'
            });
            await _Cidade.create({
                NOME: 'Portalegre'
            });
            await _Cidade.create({
                NOME: 'Fundão'
            });
        }

        const categoriaCount = await _Categoria.count();
        if(categoriaCount == 0){
            await _Categoria.create({
                NOME: 'Saúde',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de saúde, incluíndo hospitais, clínicas, veterinários, etc...'
            });
            await _Categoria.create({
                NOME: 'Desporto',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de desporto, incluíndo futebol, atletismo, natação, etc...'
            });
            await _Categoria.create({
                NOME: 'Formação',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de formação, incluíndo escolas básicas, secundárias, de condução, etc...'
            });
            await _Categoria.create({
                NOME: 'Gastronomia',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de gastronomia, incluíndo restaurantes, tascas, cafés, etc...'
            });
            await _Categoria.create({
                NOME: 'Habitação',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de habitação, incluíndo imobiliárias, casas para arrendar, etc...'
            });
            await _Categoria.create({
                NOME: 'Transportes',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de transportes, incluíndo públicos, taxis, TVDE, etc...'
            });
            await _Categoria.create({
                NOME: 'Lazer',
                DESCRICAO: 'Categoria relacionada com todos os aspetos de lazer, incluíndo parques, shoppings, piscinas, etc...'
            });
        }
        
        const subCategoriaCount = await _Subcategoria.count();
        if(subCategoriaCount == 0){
            await _Subcategoria.create({
                NOME: "Hospital",
                DESCRICAO: "Instituição de saúde que oferece serviços médicos e cirúrgicos para tratamentos diversos.", 
                IDCATEGORIA: 1
            });
            await _Subcategoria.create({
                NOME: "Clínica",
                DESCRICAO: "Estabelecimento de saúde especializado em consultas e tratamentos médicos não urgentes.", 
                IDCATEGORIA: 1
            });
            await _Subcategoria.create({
                NOME: "Veterinário",
                DESCRICAO: "Profissional que presta cuidados médicos e cirúrgicos a animais de estimação.", 
                IDCATEGORIA: 1
            });
            await _Subcategoria.create({
                NOME: "Oftalmologista",
                DESCRICAO: "Especialista em saúde ocular, diagnóstico e tratamento de problemas de visão.", 
                IDCATEGORIA: 1
            });
            await _Subcategoria.create({
                NOME: "Futebol",
                DESCRICAO: "Desporto coletivo praticado em campo, envolvendo chutar uma bola para marcar golos.", 
                IDCATEGORIA: 2
            });
            await _Subcategoria.create({
                NOME: "Padel",
                DESCRICAO: "Desporto de raquete jogado em duplas, numa quadra fechada e com paredes.", 
                IDCATEGORIA: 2
            });
            await _Subcategoria.create({
                NOME: "Basquetebol",
                DESCRICAO: "Desporto coletivo em que o objetivo é lançar a bola num cesto elevado.", 
                IDCATEGORIA: 2
            });
            await _Subcategoria.create({
                NOME: "Andebol",
                DESCRICAO: "Desporto coletivo onde os jogadores marcam golos com as mãos numa baliza adversária.", 
                IDCATEGORIA: 2
            });
            await _Subcategoria.create({
                NOME: "Escola Básica",
                DESCRICAO: "Instituição de ensino para crianças que frequentam os primeiros anos escolares.", 
                IDCATEGORIA: 3
            });
            await _Subcategoria.create({
                NOME: "Escola Secundária",
                DESCRICAO: "Instituição de ensino para adolescentes que estão em fase final da vida escolar.", 
                IDCATEGORIA: 3
            });
            await _Subcategoria.create({
                NOME: "Centro de Explicações",
                DESCRICAO: "Local onde alunos recebem apoio educativo complementar para melhorar o desempenho escolar.", 
                IDCATEGORIA: 3
            });
            await _Subcategoria.create({
                NOME: "Restaurantes",
                DESCRICAO: "Estabelecimentos que servem refeições completas, com pratos variados e serviços à mesa.", 
                IDCATEGORIA: 4
            });
            await _Subcategoria.create({
                NOME: "Tascas",
                DESCRICAO: "Estabelecimentos típicos que oferecem petiscos e bebidas num ambiente descontraído.", 
                IDCATEGORIA: 4
            });
            await _Subcategoria.create({
                NOME: "Cafés",
                DESCRICAO: "Espaços sociais que servem bebidas, bolos e refeições ligeiras, ideais para encontros informais.", 
                IDCATEGORIA: 4
            });
            await _Subcategoria.create({
                NOME: "Imobiliárias",
                DESCRICAO: "Empresas que oferecem serviços de compra, venda e arrendamento de imóveis.", 
                IDCATEGORIA: 5
            });
            await _Subcategoria.create({
                NOME: "Quartos para arrendar",
                DESCRICAO: "Alojamentos disponíveis para arrendar, ideais para estudantes ou trabalhadores.", 
                IDCATEGORIA: 5
            });
            await _Subcategoria.create({
                NOME: "Casas de férias",
                DESCRICAO: "Propriedades alugadas temporariamente para férias, oferecendo conforto e comodidade.", 
                IDCATEGORIA: 5
            });
            await _Subcategoria.create({
                NOME: "Transporte Público",
                DESCRICAO: "Serviços de transporte acessíveis ao público, como autocarros, metros e comboios.", 
                IDCATEGORIA: 6
            });
            await _Subcategoria.create({
                NOME: "Boleia",
                DESCRICAO: "Serviço de transporte partilhado, onde os condutores oferecem lugares disponíveis a outros.", 
                IDCATEGORIA: 6
            });
            await _Subcategoria.create({
                NOME: "Cinema",
                DESCRICAO: "Estabelecimento onde são exibidos filmes, proporcionando entretenimento cultural e social.", 
                IDCATEGORIA: 7
            });
            await _Subcategoria.create({
                NOME: "Parque",
                DESCRICAO: "Espaço público ao ar livre, ideal para lazer, atividades físicas e convívio familiar.", 
                IDCATEGORIA: 7
            });
            await _Subcategoria.create({
                NOME: "Shopping",
                DESCRICAO: "Centro comercial com diversas lojas, restaurantes e serviços num único local.", 
                IDCATEGORIA: 5
            });
        }

        let colaborador;
        let colaborador1;
        let colaborador2;
        let colaborador3;
        let colaborador4;
        const colaboradorCount = await _Colaborador.count();
        if(colaboradorCount == 0){
            colaborador = await _Colaborador.create({
                EMAIL: '123',
                PASSWORDCOLABORADOR: "123",
                NOME: 'Administrador',
                TELEMOVEL: '123456789',
                CIDADE: id,
                DATANASCIMENTO: '1990-01-01',
                DATAREGISTO: new Date(),
                ULTIMOLOGIN: new Date(),
                TIPOCONTA: 1,
                ATIVO: 1,
                MUDOUPASSWORD: 1
            });
            colaborador1 = await _Colaborador.create({
                EMAIL: 'guilherme@softshares.com',
                PASSWORDCOLABORADOR: "123",
                NOME: 'Guilherme Soeiro',
                TELEMOVEL: '123456789',
                CIDADE: 2,
                DATANASCIMENTO: '1990-01-01',
                DATAREGISTO: new Date(),
                ULTIMOLOGIN: new Date(),
                TIPOCONTA: 1,
                ATIVO: 1,
                MUDOUPASSWORD: 1
            });
            colaborador2 = await _Colaborador.create({
                EMAIL: 'rafael@softshares.com',
                PASSWORDCOLABORADOR: "123",
                NOME: 'Rafael Azevedo',
                TELEMOVEL: '123456789',
                CIDADE: 2,
                DATANASCIMENTO: '1990-01-01',
                DATAREGISTO: new Date(),
                ULTIMOLOGIN: new Date(),
                TIPOCONTA: 1,
                ATIVO: 1,
                MUDOUPASSWORD: 1
            });
            colaborador3 = await _Colaborador.create({
                EMAIL: 'tiago@softshares.com',
                PASSWORDCOLABORADOR: "123",
                NOME: 'Tiago Nunes',
                TELEMOVEL: '123456789',
                CIDADE: 2,
                DATANASCIMENTO: '1990-01-01',
                DATAREGISTO: new Date(),
                ULTIMOLOGIN: new Date(),
                TIPOCONTA: 1,
                ATIVO: 1,
                MUDOUPASSWORD: 1
            });
            colaborador4 = await _Colaborador.create({
                EMAIL: 'yan@softshares.com',
                PASSWORDCOLABORADOR: "123",
                NOME: 'Yan Santos',
                TELEMOVEL: '123456789',
                CIDADE: 2,
                DATANASCIMENTO: '1990-01-01',
                DATAREGISTO: new Date(),
                ULTIMOLOGIN: new Date(),
                TIPOCONTA: 1,
                ATIVO: 1,
                MUDOUPASSWORD: 1
            });
        }

        let cargo;
        const cargoCount = await _Cargo.count();
        if(cargoCount == 0){
            cargo = await _Cargo.create({
                NOME: 'Administrador',
                DESCRICAO: 'Utilizador com permissões totais'
            })
            await _Cargo.create({
                NOME: 'Colaborador',
                DESCRICAO: 'Utilizador com permissões parciais'
            })
        }

        const colaboradorCargoCount = await _Colaborador_cargo.count();
        if(colaboradorCargoCount == 0){
            const colaborador_cargo = await _Colaborador_cargo.create({
                IDCARGO: cargo.IDCARGO,
                IDCOLABORADOR: colaborador.IDCOLABORADOR
            })
            await _Colaborador_cargo.create({
                IDCARGO: cargo.IDCARGO,
                IDCOLABORADOR: colaborador1.IDCOLABORADOR
            })
            await _Colaborador_cargo.create({
                IDCARGO: cargo.IDCARGO,
                IDCOLABORADOR: colaborador2.IDCOLABORADOR
            })
            await _Colaborador_cargo.create({
                IDCARGO: cargo.IDCARGO,
                IDCOLABORADOR: colaborador3.IDCOLABORADOR
            })
        }
        
        const eventoCount = await _Evento.count();
        if(eventoCount == 0){
            const questionario = await _Questionario.create({
                NOME: 'teste inicio'
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
app.use('/cargo', Cargo);
app.use('/categoria', Categoria);
app.use('/cidade', Cidade);
app.use('/colaborador_cargo', Colaborador_cargo);
app.use('/colaborador', Colaborador);
app.use('/comentario', Comentario);
app.use('/espaco', Espaco);
app.use('/evento', Evento);
app.use('/opcoes_escolha', Opcoes_escolha);
app.use('/post', Post);
app.use('/questionario', Questionario);
app.use('/subcategoria', Subcategoria);
app.use('/voto', Voto);
app.use('/rawquery', RawQuery);
app.use('/mix', Mix);
app.use('/aviso', Aviso);
app.use('/mudarpassword', MudarPassword);
app.use('/denuncia', Denuncia);

app.get('/test', (req, res)=>{
    res.send("A funcionar!");
})

app.listen(app.get('port'), ()=>{
    console.log('Start server on port ' + app.get('port'));
})