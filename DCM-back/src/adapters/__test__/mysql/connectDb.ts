import mysql, { ConnectionOptions } from 'mysql2';

const createDb = async (): Promise<mysql.Connection> => {

    const access: ConnectionOptions = {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'DCM',
        port: 3306,
        authPlugins: {
        },
    };
    try {
        const conn = mysql.createConnection(access);
        return conn;
    } catch (e) {
        console.log("e", e)
    }

}



export const connect: Promise<mysql.Connection> = createDb();
