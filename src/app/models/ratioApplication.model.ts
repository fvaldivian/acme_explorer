import { Schema, model } from "mongoose";
import { RatioApplication } from '../types/dashboard';

const ApplicationsRatioSchema = new Schema({
    status: {
      type: String,
      enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED', 'REJECTED']
    },
    count: {
      type: Number
    },
    ratio: {
      type: Number
    }
  })

  export const ApplicationRatioModel = model('RatioApplication', ApplicationsRatioSchema)