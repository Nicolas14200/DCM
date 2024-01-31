"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const configureExpress_1 = require("./app/config/configureExpress");
const PORT = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
(0, configureExpress_1.configureExpress)(app);
//mongoose.connect('mongodb://127.0.0.1:27017/DCM') 
app.listen(PORT, () => {
    console.info(`Starting server on http://localhost:${PORT}`);
});
