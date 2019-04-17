async function executarQuery(conexao, statement) {
    await conexao.query(statement, (erro) => {
        if (erro) throw erro;
    });
}

class TabelasDAO {

    constructor(conexao) {
        this._conexao = conexao;
        this._banco = process.env.MYSQL_BD ? process.env.MYSQL_BD : 'nodejs_brincando_mysql';
    }

    async _criarTabelaUsuarios() {
        let query = `
            CREATE TABLE IF NOT EXISTS ${this._banco}.usuarios(
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
        await executarQuery(this._conexao, query);
    }

    async _criarTabelaPermissoes() {
        let query = `
            CREATE TABLE IF NOT EXISTS ${this._banco}.permissoes(
                id int(11) NOT NULL AUTO_INCREMENT,
                permissao varchar(100) NOT NULL,
                data_criacao timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
                data_alteracao timestamp NULL DEFAULT NULL,
                data_exclusao timestamp NULL DEFAULT NULL,
                PRIMARY KEY (id)
            ) ENGINE = InnoDB;
        `;
        await executarQuery(this._conexao, query);
    }

    async _criarTabelaPermissoesUsuarios() {
        let query = `
            CREATE TABLE IF NOT EXISTS ${this._banco}.permissoes_usuarios(
                id_permissoes int(11) NOT NULL,
                id_usuarios int(11) NOT NULL,
                situacao tinyint(1) NOT NULL,
                PRIMARY KEY (id_permissoes, id_usuarios)
            ) ENGINE = InnoDB;
        `;
        await executarQuery(this._conexao, query);
    }

    async _inserirChavesEstrangeiras() {
        let query = `
            ALTER TABLE ${this._banco}.permissoes_usuarios
                ADD CONSTRAINT fk_id_permissoes_usuarios
                    FOREIGN KEY (id_permissoes)
                        REFERENCES ${this._banco}.permissoes(id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION,
                ADD CONSTRAINT fk_id_usuarios_permissoes
                    FOREIGN KEY (id_usuarios)
                        REFERENCES ${this._banco}.usuarios(id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION;
        `;
        await executarQuery(this._conexao, query);
    }

    async criarTabelas() {
        await this._criarTabelaUsuarios();
        await this._criarTabelaPermissoes();
        await this._criarTabelaPermissoesUsuarios();
        await this._inserirChavesEstrangeiras();
    }
}

module.exports = TabelasDAO;