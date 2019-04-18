const pool = require('./service/MysqlPoolFactory').getPool();
const bancoDeDadosDAO = require('./database/dao/BancoDeDadosDAO');
const tabelasDAO = require('./database/dao/TabelasDAO');

async function executar() {
    await bancoDeDadosDAO.criarBanco(pool);
    await tabelasDAO.criarTabelas(pool);
}

executar();