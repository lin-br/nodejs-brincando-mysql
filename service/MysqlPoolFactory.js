const driverMysql = require('mysql');

const HOST = process.env.HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

process.on('SIGINT', () => {
    MysqlPoolFactory.getPool().end(erro => {
        if (erro) return console.log(erro);
        console.log('Poll finalizado');
        process.exit(0);
    });
});

class MysqlPoolFactory {

    static getPool(opcoes = {}) {
        let {host, user, password, database} = opcoes;

        return driverMysql.createPool({
            host: HOST ? HOST : host,
            user: USER ? USER : user,
            password: PASSWORD ? PASSWORD : password,
            database: DATABASE ? DATABASE : database
        });
    }
}

module.exports = MysqlPoolFactory;