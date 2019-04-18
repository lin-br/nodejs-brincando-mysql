class BancoDeDadosDAO {

    static async criarBanco(conexao, banco) {
        let statement = `CREATE SCHEMA IF NOT EXISTS ${banco} DEFAULT CHARACTER SET utf8mb4;`;

        await conexao.query(statement, (erro) => {
            if (erro) throw erro;
        });
    }

    static async verificarSeBancoEstaCriado(conexao, banco) {
        return await conexao.query(`SELECT * FROM ${banco}.usuarios;`, (erro) => {
            if (!erro)
                return true;
            if (erro.message.match('ER_NO_SUCH_TABLE'))
                return false;
            console.log(erro.message);
            return false;
        });
    }
}

module.exports = BancoDeDadosDAO;