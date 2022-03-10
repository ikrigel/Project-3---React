import mysql, { MysqlError } from "mysql";
import config from "../01-Utils/config";

const connection = mysql.createPool({
    host: config.mySql.host,
    user: config.mySql.user,
    password: config.mySql.password,
    database: config.mySql.database
});

const connection2 = mysql.createPool({
    host: config.mySql2.host,
    user: config.mySql2.user,
    password: config.mySql2.password,
    database: config.mySql2.database
});

function execute(sql: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, (err: MysqlError, result: any) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

function execute2(sql: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection2.query(sql, (err: MysqlError, result: any) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute,
    execute2
};