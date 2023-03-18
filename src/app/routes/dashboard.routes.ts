import {Router} from "express";
import {Routes} from "../util/routes.interface";
import DashboardController from "../controllers/dashboard.controller";

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
    }
}

export default DashboardRoutes;
