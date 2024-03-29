import {Router} from "express";
import TripController from "../controllers/trip.controller";
import {Routes} from "../util/routes.interface";
import handleValidation from "../middlewares/ValidationMiddleware";
import {createValidator} from "../validators/TripValidator";
import {verifyActorByRole} from "../controllers/auth.controller";

class TripRoutes implements Routes {
    public path = "/v1/trips";
    public router = Router();
    public controller = new TripController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.controller.getAll);
        this.router.post(this.path, createValidator, handleValidation, /*verifyActorByRole(['MANAGER']),*/ this.controller.create);
        this.router.get(`${this.path}/private`, verifyActorByRole(['MANAGER']), this.controller.getFromAuth);
        this.router.get(`${this.path}/:id`, this.controller.get);
        this.router.put(`${this.path}/:id`, createValidator, handleValidation, /*verifyActorByRole(['MANAGER']),*/ this.controller.update);
        this.router.delete(`${this.path}/:id`, /*verifyActorByRole(['MANAGER']),*/ this.controller.delete);
        this.router.put(`${this.path}/:id/cancel`, /*verifyActorByRole(['MANAGER']),*/ this.controller.cancel);
        this.router.get(`${this.path}/search`, this.controller.search);
        this.router.get(`${this.path}/:id/applications`, /*verifyActorByRole(['MANAGER']),*/ this.controller.getTripApplications);
    }
}

export default TripRoutes;