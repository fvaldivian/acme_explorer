import {model, Schema} from "mongoose";
import interConfig from '../types/config'

const ConfigurationSchema = new Schema({
        cache_time: {
            type: Number,
            default: 60,
            min: 60,
            max: 1440,
            require: 'Kindly enter the cache minutes for the finder'
        },
        dashboard_time: {
            type: Number,
            default: 1000,
            min: 0,
            require: 'Kindly enter the dashboard time'
        },
        search_result: {
            type: Number,
            default: 10,
            min: 0,
            max: 100,
            require: 'Kindly enter the max result for a finder'
        },
        sponsorship_price: {
            type: Number,
            default: 100,
            min: 0,
            require: 'Kindly enter the sponsorship price'
        }
      })


export default model<interConfig>('Configuration', ConfigurationSchema)