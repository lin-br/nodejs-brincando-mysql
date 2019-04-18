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
}

module.exports = UsuariosService;