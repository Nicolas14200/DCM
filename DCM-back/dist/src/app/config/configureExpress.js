"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureExpress = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("../../app/modules/users/UserController");
const AppDependencies_1 = require("./AppDependencies");
const PlotController_1 = require("../../app/modules/plot/PlotController");
const EventCultureController_1 = require("../../app/modules/eventCulture/EventCultureController");
async function configureExpress(app) {
    const routes = [UserController_1.UserController, PlotController_1.PlotController, EventCultureController_1.EventCultureController];
    const container = new AppDependencies_1.AppDependencies().init();
    app.use(express_1.default.json());
    (0, routing_controllers_1.useContainer)(await container);
    (0, routing_controllers_1.useExpressServer)(app, {
        controllers: routes
    });
    return container;
}
exports.configureExpress = configureExpress;
