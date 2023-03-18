import { Schema, model } from 'mongoose';
import { Dashboard } from '../types/dashboard';
import { ApplicationRatioModel } from './ratioApplication.model';
import { InformationDashboardModel } from './informationDashboard.model';

const DashboardSchema = new Schema({
    price_per_trip: {InformationDashboardModel},
    application_per_trip: {InformationDashboardModel},
    trip_per_manager: {InformationDashboardModel}
})

export const DashboardModel = model('Dashbord', DashboardSchema)