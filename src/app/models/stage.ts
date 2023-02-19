import { model, Schema } from "mongoose";
import Stage from "../types/stage";

const stage = new Schema({
  title: {
    type: String,
    require: false,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  }
});

export default model<Stage>("Stage", stage);
