import mysql, { ConnectionOptions } from 'mysql2';

export const createDb = async (): Promise<mysql.Connection> => {

    const access: ConnectionOptions = {
        host: 'mysql',
        user: 'root',
        password: 'root',
        database: 'DCM',
        port: 3306,
        insecureAuth:true
    };
    try {
        const conn = mysql.createConnection(access);
        return conn;
    } catch (e) {
        console.log("e", e)
    }

}

