const bancoDeDadosDAO = require('../database/dao/criacao/BancoDeDadosDAO');
const tabelasDAO = require('../database/dao/criacao/TabelasDAO');

class BancoDeDadosService {

    static async inicializar(conexao) {

        let banco = process.env.MYSQL_BD ? process.env.MYSQL_BD : 'nodejs_brincando_mysql';

        if (!bancoDeDadosDAO.verificarSeBancoEstaCriado(conexao, banco)) {
            await bancoDeDadosDAO.criarBanco(conexao, banco);
            await tabelasDAO.criarTabelas(conexao, banco);
        }

        await console.log(`Banco de dados ${banco} criado!`);
    }
}

module.exports = BancoDeDadosService;