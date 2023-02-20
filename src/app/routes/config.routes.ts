import {Router} from "express";
import ConfigController from "../controllers/config.controller";
import {createValidator} from "../validators/ConfigValidator";
import handleValidation from "../middlewares/ValidationMiddleware";
import {Routes} from "../util/routes.interface";

class ConfigRoutes implements Routes {
    public path = "/v1/config";
    public router = Router();
    public controller = new ConfigController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            this.path,
            createValidator,
            handleValidation,
            this.controller.addConfiguration
        );
        this.router.get(this.path, this.controller.getConfiguration);
        this.router.put(
            `${this.path}/:id`,
            handleValidation,
            this.controller.updateConfiguration
        );
    }
}

export default ConfigRoutes;
