import {model, Schema} from "mongoose";
import Stage from "../types/stage";

export const StageSchema = new Schema<Stage>({
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
        min: 0
    }
});

export const StageModel = model<Stage>('Stage', StageSchema)
