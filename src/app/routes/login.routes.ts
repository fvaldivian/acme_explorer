import {Router} from "express";
import ActorController from "../controllers/actor.controller";
import handleValidation from "../middlewares/ValidationMiddleware";
import {Routes} from "../util/routes.interface";

class LoginRoutes implements Routes {
    public path = "/v2/login";
    public router = Router();
    public controller = new ActorController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            handleValidation,
            this.controller.login
        );
    }
}

export default LoginRoutes;
