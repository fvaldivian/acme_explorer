import { Schema, model } from 'mongoose';
import { RatioApplication, Dashboard } from '../types/dashboard';

const DashboardSchema = new Schema({
    ratio_application:{
        type: Object,
        require: 'Kindly enter the ratio application'
    },
    price_per_trip:{
        type: Object,
        require: 'Kindly enter the price per trip '
    },
    application_per_trip:{
        type: Object,
        require: 'Kindly enter the ratio application per trip'
    },
    trip_per_manager: {
        type: Object,
        require: 'Kindly enter the ratio trip per manager'
    }
})

export const DashboardModel = model<Dashboard>('Dashbord', DashboardSchema)