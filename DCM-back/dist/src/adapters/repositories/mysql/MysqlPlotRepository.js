"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlPlotRepository = void 0;
const PlotError_1 = require("../../../core/domain/models/errors/PlotError");
const Plot_1 = require("../../../core/domain/entities/plot/Plot");
const inversify_1 = require("inversify");
const mysql2_1 = __importDefault(require("mysql2"));
let MysqlPlotRepository = class MysqlPlotRepository {
    connect;
    constructor(connect) {
        this.connect = connect;
        this.connect = connect;
    }
    async save(plot) {
        await this.connect.promise().beginTransaction();
        try {
            // await this.connect.promise().query(`
            //    DELETE FROM plot
            //    WHERE id = ?`,
            //    [plot.props.id]);
            await this.connect.promise().query(`
                INSERT IGNORE INTO plot (id, name, code_name, width, height, area, ph, pebbles, plank)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [plot.props.id, plot.props.name, plot.props.codeName, plot.props.width, plot.props.heigth, plot.props.area, plot.props.ph, plot.props.pebbles, plot.props.plank]);
            await this.connect.promise().query(`
                DELETE FROM series
                WHERE plot_id = ?`, [plot.props.id]);
            if (plot.props.series && plot.props.series.length > 0) {
                const seriesValues = plot.props.series.map((serie) => [plot.props.id, serie.vegetableVariety, serie.nbPlank]);
                await this.connect.promise().query(`
                    INSERT INTO series (plot_id, vegetable_variety, nb_plank)
                    VALUES ?`, [seriesValues]);
            }
            await this.connect.promise().commit();
        }
        catch (error) {
            await this.connect.promise().rollback();
            throw error;
        }
        return plot;
    }
    async getById(id) {
        const [results] = await this.connect.promise().query(`
        SELECT
        p.code_name,
        p.area,
        GROUP_CONCAT(DISTINCT e.id) AS event_culture,
        p.id,
        p.name,
        p.sub_plot,
        p.height,
        p.pebbles,
        p.ph,
        p.plank,
        p.width,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'vegetableVariety', s.vegetable_variety,
                    'nbPlank', s.nb_plank
                )
            )
            FROM (
                SELECT s.vegetable_variety, s.nb_plank
                FROM series AS s
                WHERE p.id = s.plot_id
                ORDER BY s.vegetable_variety
            ) AS s
        ) AS series
    FROM plot AS p
    LEFT JOIN event_culture AS e ON p.id = e.plot_id
    WHERE p.id = ?
    GROUP BY p.id;
        `, [id]);
        if (results && results.length > 0) {
            let uniqueSeries;
            if (results[0].series && results[0].series.length > 0) {
                uniqueSeries = results[0].series.map((obj) => {
                    return {
                        vegetableVariety: obj.vegetableVariety,
                        nbPlank: obj.nbPlank
                    };
                });
            }
            else {
                uniqueSeries = [];
            }
            let eventCulture;
            if (results[0].event_culture) {
                eventCulture = results[0].event_culture.split(',');
            }
            else {
                eventCulture = [];
            }
            return new Plot_1.Plot({
                codeName: results[0].code_name,
                area: results[0].area,
                eventCulture: eventCulture,
                id: results[0].id,
                name: results[0].name,
                subPlot: results[0].sub_plot,
                heigth: results[0].height,
                pebbles: results[0].pebbles,
                ph: results[0].ph,
                plank: results[0].plank,
                width: results[0].width,
                series: uniqueSeries
            });
        }
        else {
            throw new PlotError_1.PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND");
        }
    }
    async getByCodeName(codeName) {
        const [results] = await this.connect.promise().query(`
        SELECT
        p.code_name,
        p.area,
        GROUP_CONCAT(DISTINCT e.id) AS event_culture,
        p.id,
        p.name,
        p.sub_plot,
        p.height,
        p.pebbles,
        p.ph,
        p.plank,
        p.width,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'vegetableVariety', s.vegetable_variety,
                    'nbPlank', s.nb_plank
                )
            )
            FROM (
                SELECT s.vegetable_variety, s.nb_plank
                FROM series AS s
                WHERE p.id = s.plot_id
                ORDER BY s.vegetable_variety
            ) AS s
        ) AS series
    FROM plot AS p
    LEFT JOIN event_culture AS e ON p.id = e.plot_id
    WHERE p.code_name = ?
    GROUP BY p.id;
        `, [codeName]);
        if (results && results.length > 0) {
            let uniqueSeries;
            if (results[0].series && results[0].series.length > 0) {
                uniqueSeries = results[0].series.map((obj) => {
                    return {
                        vegetableVariety: obj.vegetableVariety,
                        nbPlank: obj.nbPlank
                    };
                });
            }
            else {
                uniqueSeries = [];
            }
            let eventCulture;
            if (results[0].event_culture) {
                eventCulture = results[0].event_culture.split(',');
            }
            else {
                eventCulture = [];
            }
            return new Plot_1.Plot({
                codeName: results[0].code_name,
                area: results[0].area,
                eventCulture: eventCulture,
                id: results[0].id,
                name: results[0].name,
                subPlot: results[0].sub_plot,
                heigth: results[0].height,
                pebbles: results[0].pebbles,
                ph: results[0].ph,
                plank: results[0].plank,
                width: results[0].width,
                series: uniqueSeries
            });
        }
        else {
            throw new PlotError_1.PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND");
        }
    }
    async queryOfHell() {
        const [results] = await this.connect.promise().query(`
        SELECT u.security_code, u.id, u.name
        FROM user AS u;
        SELECT e.plot_id, e.quantity, e.nb_plank
        FROM event_culture AS e;
        CREATE TABLE toto (
            id INT PRIMARY KEY AUTO_INCREMENT,
            chiffre1 INT,
            chiffre2 INT,
            somme INT
        );
        INSERT INTO toto (x, y, sum) VALUES (e.quantity, e.nb_plank, e.quantity + e.nb_plank);
        `, []);
    }
    async getAll() {
        const [results] = await this.connect.promise().query(`
            SELECT p.*, s.vegetable_variety, s.nb_plank, e.id AS ev_id
            FROM plot AS p 
            LEFT JOIN series AS s ON p.id = s.plot_id
            LEFT JOIN event_culture AS e ON p.id = e.plot_id
        `, []);
        const plotsMap = new Map();
        if (results && results.length > 0) {
            results.forEach(plot => {
                const plotId = plot.id;
                let currentPlot = plotsMap.get(plotId);
                if (!currentPlot) {
                    currentPlot = new Plot_1.Plot({
                        codeName: plot.code_name,
                        area: plot.area,
                        id: plot.id,
                        name: plot.name,
                        subPlot: plot.sub_plot,
                        heigth: plot.height,
                        pebbles: plot.pebbles,
                        ph: plot.ph,
                        plank: plot.plank,
                        width: plot.width,
                        series: [],
                        eventCulture: []
                    });
                    plotsMap.set(plotId, currentPlot);
                }
                const existingSeries = currentPlot.props.series.find(series => series.vegetableVariety === plot.vegetable_variety && series.nbPlank === plot.nb_plank);
                if (!existingSeries && plot.vegetable_variety && plot.nb_plank) {
                    currentPlot.props.series.push({
                        vegetableVariety: plot.vegetable_variety,
                        nbPlank: plot.nb_plank
                    });
                }
                if (plot.ev_id) {
                    currentPlot.props.eventCulture.push(plot.ev_id);
                }
            });
        }
        const plots = Array.from(plotsMap.values());
        return plots;
    }
    async delete(id) {
        await this.connect.promise().query('DELETE FROM plot WHERE id = ?', [id]);
        return true;
    }
    update(plot) {
        throw new Error("Method not implemented.");
    }
};
exports.MysqlPlotRepository = MysqlPlotRepository;
exports.MysqlPlotRepository = MysqlPlotRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], MysqlPlotRepository);
