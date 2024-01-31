"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iconv_lite_1 = __importDefault(require("iconv-lite"));
iconv_lite_1.default.encodingExists("cesu8") || iconv_lite_1.default.encodeStream("utf8", {});
