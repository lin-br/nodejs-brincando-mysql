const driverMysql = require('mysql');

const HOST = process.env.HOST ? process.env.HOST : 'localhost';
const USER = process.env.MYSQL_USER ? process.env.MYSQL_USER : 'root';
const PASSWORD = process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : '123456';

process.on('SIGINT', () => {
    MysqlPoolFactory.getPool().end(erro => {
        if (erro) return console.log(erro);
        console.log('Poll finalizado');
        process.exit(0);
    });
});

class MysqlPoolFactory {

    static getPool() {
        return driverMysql.createPool({
            host: HOST,
            user: USER,
            password: PASSWORD
        });
    }
}

module.exports = MysqlPoolFactory;