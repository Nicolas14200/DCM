import * as mongoose from "mongoose";
export const eventCultureShema = new mongoose.Schema({
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
    typeEventCulture:{
        type: String
    },
    machine:{
        type: String
    }, 
    bringType: {
        type: String
    },
    quantity: {
        type: Number
    },
    vegetable: {
        vegetableName:{ 
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
    nbHours:{
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
})
export const EventCultureModel = mongoose.model("eventCultures", eventCultureShema)