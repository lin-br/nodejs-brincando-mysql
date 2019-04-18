class UsuarioDao {

    constructor(conexao) {
        this._conexao = conexao;
    }

    cadastrar(usuario, senha) {
        return new Promise((resolve, reject) => {
            this._conexao.query('INSERT INTO usuarios (usuario, senha, situacao) VALUES (?,?,1);',
                [usuario, senha],
                (erro, resultado) => {
                    if (erro) {
                        reject(erro);
                    } else {
                        resolve(resultado.insertId);
                    }
                }
            );
        });
    }
}

module.exports = UsuarioDao;