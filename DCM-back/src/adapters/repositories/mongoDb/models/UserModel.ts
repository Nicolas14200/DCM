import * as mongoose from "mongoose";

const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  securityCode:{
    type: String
  }

})
export const UserModel = mongoose.model("user", userShema);