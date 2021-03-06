const MysqlPoolFactory = require('./MysqlPoolFactory');
const UsuarioDao = require('../database/dao/UsuarioDao');

const pool = MysqlPoolFactory.getPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nodejs_brincando_mysql'
});

class UsuariosService {

    static cadastrarUsuario(usuario, senha) {
        return new UsuarioDao(pool).cadastrar(usuario, senha);
    }

    static consultarUsuario(id) {
        return new UsuarioDao(pool).consultar(id);
    }

    static excluirUsuario(id) {
        return new UsuarioDao(pool).excluir(id);
    }

    static consultarTodos() {
        return new UsuarioDao(pool).consultarTodos();
    }
}

module.exports = UsuariosService;