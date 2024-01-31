"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const createDb = async () => {
    const access = {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'DCM',
        port: 3306,
        authPlugins: {},
    };
    try {
        const conn = mysql2_1.default.createConnection(access);
        return conn;
    }
    catch (e) {
        console.log("e", e);
    }
};
exports.connect = createDb();
