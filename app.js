const pool = require('./service/MysqlPoolFactory').getPool();
const bancoDeDadosDAO = require('./database/dao/BancoDeDadosDAO');
const TabelasDAO = require('./database/dao/TabelasDAO');

async function executar() {
    await bancoDeDadosDAO.criarBanco(pool);
    let tabelasDAO = new TabelasDAO(pool);
    await tabelasDAO.criarTabelas();
}

executar();