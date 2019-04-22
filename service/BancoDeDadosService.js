const bancoDeDadosDAO = require('../database/dao/criacao/BancoDeDadosDAO');

class BancoDeDadosService {

    static async inicializar(conexao) {

        let banco = process.env.MYSQL_BD ? process.env.MYSQL_BD : 'nodejs_brincando_mysql';
        await bancoDeDadosDAO.criarTabelas(conexao);
        await console.log(`Banco de dados ${banco} criado!`);
    }
}

module.exports = BancoDeDadosService;