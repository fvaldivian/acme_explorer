import {Router} from "express";
import TripController from "../controllers/trip.controller";
import {Routes} from "../util/routes.interface";
import handleValidation from "../middlewares/ValidationMiddleware";
import {createValidator} from "../validators/TripValidator";

class TripRoutes implements Routes {
    public path = "/v1/trips";
    public router = Router();
    public controller = new TripController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            this.path,
            createValidator,
            handleValidation,
            this.controller.create
        );
        this.router.get(this.path, this.controller.getAll);
        this.router.get(`${this.path}:id`, this.controller.get);
        this.router.put(
            `${this.path}:id`,
            createValidator,
            handleValidation,
            this.controller.update
        );
        this.router.delete(`${this.path}:id`, this.controller.delete);
        this.router.get(`${this.path}/search`, this.controller.search);
    }
}

export default TripRoutes;
