const pool = require('./service/MysqlPoolFactory').getPool();
const BancoDeDadosService = require('./service/BancoDeDadosService');

BancoDeDadosService.inicializar(pool);