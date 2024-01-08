import "reflect-metadata";
import express, { Application } from "express";
import { useContainer, useExpressServer } from "routing-controllers";
import { UserController } from "../../app/modules/users/UserController";
import { AppDependencies } from "./AppDependencies";
import { PlotController } from "../../app/modules/plot/PlotController";
import { EventCultureController } from "../../app/modules/eventCulture/EventCultureController";

export function configureExpress(app: Application) {
    
    const routes = [UserController, PlotController, EventCultureController];

    const container = new AppDependencies().init();
    
    app.use(express.json());
    
    useContainer(container);
    
    useExpressServer(app, {
        controllers: routes
    })
    return container
}