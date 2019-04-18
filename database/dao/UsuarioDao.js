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

    consultar(id) {
        return new Promise((resolve, reject) => {
            this._conexao.query('SELECT * FROM usuarios WHERE id = ?;',
                [id],
                (erro, resultado) => {
                    if (erro) {
                        reject(erro);
                    } else {
                        if (resultado.length)
                            resolve(resultado);
                        resolve('');
                    }
                }
            );
        });
    }
}

module.exports = UsuarioDao;