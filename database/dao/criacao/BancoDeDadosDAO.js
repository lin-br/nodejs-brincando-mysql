async function executarQuery(conexao, statement) {
    await conexao.query(statement, (erro) => {
        if (erro) throw erro;
    });
}

async function criarTabelaUsuarios(conexao) {
    let query = `
            CREATE TABLE IF NOT EXISTS usuarios(
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

async function criarTabelaPermissoes(conexao) {
    let query = `
            CREATE TABLE IF NOT EXISTS permissoes(
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

async function criarTabelaPermissoesUsuarios(conexao) {
    let query = `
            CREATE TABLE IF NOT EXISTS permissoes_usuarios(
                id_permissoes int(11) NOT NULL,
                id_usuarios int(11) NOT NULL,
                situacao tinyint(1) NOT NULL,
                PRIMARY KEY (id_permissoes, id_usuarios),
                CONSTRAINT fk_id_permissoes_usuarios
                    FOREIGN KEY (id_permissoes)
                        REFERENCES permissoes(id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION,
                CONSTRAINT fk_id_usuarios_permissoes
                    FOREIGN KEY (id_usuarios)
                        REFERENCES usuarios(id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION
            ) ENGINE = InnoDB;
        `;
    await executarQuery(conexao, query);
}

class BancoDeDadosDAO {

    static async criarTabelas(conexao) {
        await criarTabelaUsuarios(conexao);
        await criarTabelaPermissoes(conexao);
        await criarTabelaPermissoesUsuarios(conexao);
    }
}

module.exports = BancoDeDadosDAO;