import {Router} from "express";
import handleValidation from "../middlewares/ValidationMiddleware";
import {createValidator} from "../validators/ActorValidator";
import {Routes} from "../util/routes.interface";
import ActorController from "../controllers/actor.controller";

class ActorRoutes implements Routes {
    public path = '/v1/actors';
    public router = Router();
    public controller = new ActorController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, createValidator, handleValidation, this.controller.create);
        this.router.get(this.path, this.controller.getAll);
        this.router.get(`${this.path}/:id`, this.controller.get);
        this.router.put(`${this.path}/:id`, createValidator, handleValidation, this.controller.update);
        this.router.delete(`${this.path}/:id`, this.controller.delete);
        this.router.patch(`${this.path}:id/activated`, this.controller.delete)
    }
}


export default ActorRoutes;
