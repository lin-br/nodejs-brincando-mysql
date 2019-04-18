async function executarQuery(conexao, statement) {
    await conexao.query(statement, (erro) => {
        if (erro) throw erro;
    });
}

async function criarTabelaUsuarios(conexao, banco) {
    let query = `
            CREATE TABLE IF NOT EXISTS ${banco}.usuarios(
                id int(11) NOT NULL AUTO_INCREMENT,
                usuario varchar(50) NOT NULL,
                senha varchar(100) NOT NULL,
                situacao tinyint(1) NOT NULL,
                data_criacao timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
                data_alteracao timestamp NULL DEFAULT NULL,
                data_exclusao timestamp NULL DEFAULT NULL,
                PRIMARY KEY (id)
            ) ENGINE = InnoDB;
        `;
    await executarQuery(conexao, query);
}

async function criarTabelaPermissoes(conexao, banco) {
    let query = `
            CREATE TABLE IF NOT EXISTS ${banco}.permissoes(
                id int(11) NOT NULL AUTO_INCREMENT,
                permissao varchar(100) NOT NULL,
                data_criacao timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
                data_alteracao timestamp NULL DEFAULT NULL,
                data_exclusao timestamp NULL DEFAULT NULL,
                PRIMARY KEY (id)
            ) ENGINE = InnoDB;
        `;
    await executarQuery(conexao, query);
}

async function criarTabelaPermissoesUsuarios(conexao, banco) {
    let query = `
            CREATE TABLE IF NOT EXISTS ${banco}.permissoes_usuarios(
                id_permissoes int(11) NOT NULL,
                id_usuarios int(11) NOT NULL,
                situacao tinyint(1) NOT NULL,
                PRIMARY KEY (id_permissoes, id_usuarios)
            ) ENGINE = InnoDB;
        `;
    await executarQuery(conexao, query);
}

async function inserirChavesEstrangeiras(conexao, banco) {
    let query = `
            ALTER TABLE ${banco}.permissoes_usuarios
                ADD CONSTRAINT fk_id_permissoes_usuarios
                    FOREIGN KEY (id_permissoes)
                        REFERENCES ${banco}.permissoes(id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION,
                ADD CONSTRAINT fk_id_usuarios_permissoes
                    FOREIGN KEY (id_usuarios)
                        REFERENCES ${banco}.usuarios(id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION;
        `;
    await executarQuery(conexao, query);
}

class TabelasDAO {

    static async criarTabelas(conexao, banco) {
        await criarTabelaUsuarios(conexao, banco);
        await criarTabelaPermissoes(conexao, banco);
        await criarTabelaPermissoesUsuarios(conexao, banco);
        await inserirChavesEstrangeiras(conexao, banco);
    }
}

module.exports = TabelasDAO;