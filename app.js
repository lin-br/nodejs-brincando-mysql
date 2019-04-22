const express = require('express');
const helmet = require('helmet');
const UsuariosController = require('./controller/UsuariosController');
const BancoDeDadosService = require('./service/BancoDeDadosService');
const MysqlPoolFactory = require('./service/MysqlPoolFactory');

BancoDeDadosService.inicializar(MysqlPoolFactory.getPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs_brincando_mysql'
}));

const app = express();

app.use(helmet());
app.use(express.json());
app.use('/usuarios/', UsuariosController);

app.listen('3000', function () {
    console.log(`Servidor WEB ligado na porta: ${this.address().port}`);
});