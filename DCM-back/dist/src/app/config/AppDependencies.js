"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDependencies = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserController_1 = require("../../app/modules/users/UserController");
const BcryptPasswordGateway_1 = require("../../adapters/gateways/bcrypt/BcryptPasswordGateway");
const DCMIdentifiers_1 = require("../../core/usecase/DCMIdentifiers");
const CreateUser_1 = require("../../core/usecase/user/CreateUser");
const inversify_1 = require("inversify");
const UpdateUser_1 = require("../../core/usecase/user/UpdateUser");
const PlotController_1 = require("../../app/modules/plot/PlotController");
const CreatePlot_1 = require("../../core/usecase/plot/CreatePlot");
const GetUserById_1 = require("../../core/usecase/user/GetUserById");
const DeleteUser_1 = require("../../core/usecase/user/DeleteUser");
const UpdatePlot_1 = require("../../core/usecase/plot/UpdatePlot");
const DeletePlot_1 = require("../../core/usecase/plot/DeletePlot");
const GetPlotById_1 = require("../../core/usecase/plot/GetPlotById");
const EventCultureController_1 = require("../../app/modules/eventCulture/EventCultureController");
const CreateEventCulture_1 = require("../../core/usecase/eventCulture/CreateEventCulture");
const GetEventsCulturesByPlotId_1 = require("../../core/usecase/eventCulture/GetEventsCulturesByPlotId");
const GetEventCultureById_1 = require("../../core/usecase/eventCulture/GetEventCultureById");
const DeleteEventCulture_1 = require("../../core/usecase/eventCulture/DeleteEventCulture");
const UpdateEventCulture_1 = require("../../core/usecase/eventCulture/UpdateEventCulture");
const AddSeriesToPlot_1 = require("../../core/usecase/plot/AddSeriesToPlot");
const AddSubPlot_1 = require("../../core/usecase/plot/AddSubPlot");
const JwtIdentityGateway_1 = require("../../adapters/gateways/jwt/JwtIdentityGateway");
const SignIn_1 = require("../../core/usecase/user/SignIn");
const AuthenticationMiddleware_1 = require("../middlewares/AuthenticationMiddleware");
const GetAllPlot_1 = require("../../core/usecase/plot/GetAllPlot");
const MailJetGateway_1 = require("../../adapters/gateways/mailJet/MailJetGateway");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
const GeneratePasswordRecovery_1 = require("../../core/usecase/user/password/GeneratePasswordRecovery");
const ResetPassword_1 = require("../../core/usecase/user/password/ResetPassword");
const GetPlotByCodeName_1 = require("../../core/usecase/plot/GetPlotByCodeName");
const MysqlUserRepository_1 = require("../../adapters/repositories/mysql/MysqlUserRepository");
const connectDb_1 = require("../../adapters/repositories/mysql/connectDb");
const MysqlPlotRepository_1 = require("../../adapters/repositories/mysql/MysqlPlotRepository");
const MysqlEventCultureRepository_1 = require("../../adapters/repositories/mysql/MysqlEventCultureRepository");
const connect = (0, connectDb_1.createDb)();
class AppDependencies extends inversify_1.Container {
    async init() {
        this.bind(DCMIdentifiers_1.DCMIdentifiers.passwordGateway).toConstantValue(new BcryptPasswordGateway_1.BcryptPasswordGateway());
        //this.bind(DCMIdentifiers.userRepository).toConstantValue(new MongoDbUserRepository())
        this.bind(DCMIdentifiers_1.DCMIdentifiers.userRepository).toConstantValue(new MysqlUserRepository_1.MysqlUserRepository(await connect));
        //this.bind(DCMIdentifiers.eventCultureRepository).toConstantValue(new MongoDbEventCultureRepository())
        this.bind(DCMIdentifiers_1.DCMIdentifiers.eventCultureRepository).toConstantValue(new MysqlEventCultureRepository_1.MysqlEventCultureRepository(await connect));
        //this.bind(DCMIdentifiers.plotRepository).toConstantValue(new MongoDbPlotRepository())
        this.bind(DCMIdentifiers_1.DCMIdentifiers.plotRepository).toConstantValue(new MysqlPlotRepository_1.MysqlPlotRepository(await connect));
        this.bind(DCMIdentifiers_1.DCMIdentifiers.identityGateway).toConstantValue(new JwtIdentityGateway_1.JwtIdentityGateway(process.env.JWT_KEY));
        this.bind(DCMIdentifiers_1.DCMIdentifiers.emailGateway).toConstantValue(new MailJetGateway_1.MailJetGateway(new node_mailjet_1.default({
            apiKey: process.env.MJ_APIKEY_PUBLIC,
            apiSecret: process.env.MJ_APIKEY_PRIVATE,
        })));
        this.bind(AuthenticationMiddleware_1.AuthenticationMiddleware).toSelf();
        this.bind(UserController_1.UserController).toSelf();
        this.bind(SignIn_1.SignIn).toSelf();
        this.bind(CreateUser_1.CreateUser).toSelf();
        this.bind(UpdateUser_1.UpdateUser).toSelf();
        this.bind(GetUserById_1.GetUserById).toSelf();
        this.bind(DeleteUser_1.DeleteUser).toSelf();
        this.bind(GeneratePasswordRecovery_1.GeneratePasswordRecovery).toSelf();
        this.bind(ResetPassword_1.ResetPassword).toSelf();
        this.bind(PlotController_1.PlotController).toSelf();
        this.bind(CreatePlot_1.CreatePlot).toSelf();
        this.bind(UpdatePlot_1.UpdatePlot).toSelf();
        this.bind(DeletePlot_1.DeletePlot).toSelf();
        this.bind(GetPlotById_1.GetPlotById).toSelf();
        this.bind(GetPlotByCodeName_1.GetPlotByCodeName).toSelf();
        this.bind(GetAllPlot_1.GetAllPlot).toSelf();
        this.bind(AddSeriesToPlot_1.AddSeriesToPlot).toSelf();
        this.bind(AddSubPlot_1.AddSubPlot).toSelf();
        this.bind(EventCultureController_1.EventCultureController).toSelf();
        this.bind(CreateEventCulture_1.CreateEventCulture).toSelf();
        this.bind(GetEventCultureById_1.GetEventCultureById).toSelf();
        this.bind(GetEventsCulturesByPlotId_1.GetEventsCulturesByPlotId).toSelf();
        this.bind(DeleteEventCulture_1.DeleteEventCulture).toSelf();
        this.bind(UpdateEventCulture_1.UpdateEventCulture).toSelf();
        return this;
    }
}
exports.AppDependencies = AppDependencies;
