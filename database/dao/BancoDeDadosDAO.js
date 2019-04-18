class BancoDeDadosDAO {

    static async criarBanco(conexao) {

        let banco = process.env.MYSQL_BD ? process.env.MYSQL_BD : 'nodejs_brincando_mysql';
        let statement = `CREATE SCHEMA IF NOT EXISTS ${banco} DEFAULT CHARACTER SET utf8mb4;`;

        await conexao.query(statement, (erro) => {
            if (erro) throw erro;
        });
    }
}

module.exports = BancoDeDadosDAO;