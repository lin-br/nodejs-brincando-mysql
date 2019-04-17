async function excluirSchema(conexao, banco) {
    let query = `DROP SCHEMA IF EXISTS ${banco};`;
    executarQuery(conexao, query);
}

async function criarSchema(conexao, banco) {
    let query = `CREATE SCHEMA IF NOT EXISTS ${banco} DEFAULT CHARACTER SET utf8mb4;`;
    executarQuery(conexao, query);
}

function executarQuery(conexao, statement) {
    conexao.query(statement, (erro) => {
        if (erro) throw erro;
    });
}

class BancoDeDadosDAO {

    static async criarBanco(conexao) {

        let banco = process.env.MYSQL_BD ? process.env.MYSQL_BD : 'nodejs_brincando_mysql';

        await excluirSchema(conexao, banco);
        await criarSchema(conexao, banco);
    }
}

module.exports = BancoDeDadosDAO;