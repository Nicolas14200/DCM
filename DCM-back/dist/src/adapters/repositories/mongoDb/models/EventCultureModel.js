"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCultureModel = exports.eventCultureShema = void 0;
const mongoose = __importStar(require("mongoose"));
exports.eventCultureShema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    note: {
        type: String,
    },
    plotId: {
        type: String,
        required: true,
    },
    typeEventCulture: {
        type: String
    },
    machine: {
        type: String
    },
    bringType: {
        type: String
    },
    quantity: {
        type: Number
    },
    vegetable: {
        vegetableName: {
            type: String
        },
        variety: {
            type: String
        },
        familly: {
            type: String
        },
    },
    method: {
        type: String
    },
    nbHuman: {
        type: Number
    },
    nbHours: {
        type: Number
    },
    succes: {
        type: Number
    },
    disease: {
        type: String
    },
    bug: {
        type: String
    }
});
exports.EventCultureModel = mongoose.model("eventCultures", exports.eventCultureShema);
