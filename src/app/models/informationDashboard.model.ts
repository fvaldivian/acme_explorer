import { Schema, model } from "mongoose";
import { InformationDashboard } from '../types/dashboard';

const InformationDashboardSchema = new Schema({
  
    average: {
        type: Number
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      },
      standard_desviation: {
        type: Number
      }
  });
  export const InformationDashboardModel = model('RatioApplication', InformationDashboardSchema)