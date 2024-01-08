import * as mongoose from "mongoose";
export const seriesModel = new mongoose.Schema({
    vegetableVariety:{
        type: String
        },
    nbPlank: {
        type: Number
        }
})