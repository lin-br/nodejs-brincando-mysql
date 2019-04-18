const pool = require('./service/MysqlPoolFactory').getPool();
const bancoDeDadosDAO = require('./database/dao/criacao/BancoDeDadosDAO');
const tabelasDAO = require('./database/dao/criacao/TabelasDAO');

async function executar() {
    await bancoDeDadosDAO.criarBanco(pool);
    await tabelasDAO.criarTabelas(pool);
}

executar();