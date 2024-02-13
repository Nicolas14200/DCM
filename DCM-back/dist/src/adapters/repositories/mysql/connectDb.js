"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDb = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const createDb = async () => {
    const access = {
        host: 'mysql',
        user: 'root',
        password: 'root',
        database: 'DCM',
        port: 3306,
        insecureAuth: true
    };
    try {
        const conn = mysql2_1.default.createConnection(access);
        return conn;
    }
    catch (e) {
        console.log("e", e);
    }
};
exports.createDb = createDb;
