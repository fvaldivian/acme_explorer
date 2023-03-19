import {Router} from "express";
import {Routes} from "../util/routes.interface";
import DashboardController from "../controllers/dashboard.controller";
import cron from 'node-cron'

//cron.schedule( '*/10 * * * * *', ()=>{
//    console.log("hola")
//  })


class DashboardRoutes implements Routes {
    public path = "/v1/dashboard";
    public router = Router();
    public controller = new DashboardController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.controller.ratioApplications)
        this.router.get(`${this.path}/info-trip-price`,this.controller.infoTripPrice)
        this.router.get(`${this.path}/info-application-x-trip`,this.controller.applicationXTrip)
        this.router.get(`${this.path}/info-trip-per-manager`,this.controller.infoTripManager)
        this.router.post(`${this.path}/compute-dashbboard`,this.controller.genereteDashboardInfo)
        this.router.get(`${this.path}/prueba`,this.controller.getAllDashboard) 
        this.router.get(`${this.path}/get-last-dashboard`,this.controller.getLastDashboard) 
    }
}

export default DashboardRoutes;
