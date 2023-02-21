import {Router} from "express";
import FinderController from "../controllers/finder.controller";
import {createValidator} from "../validators/FinderValidator";
import {Routes} from "../util/routes.interface";
import handleValidation from "../middlewares/ValidationMiddleware";

class FinderRoutes implements Routes {
    public path = '/v1/finder';
    public router = Router();
    public controller = new FinderController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            this.path,
            createValidator,
            handleValidation,
            this.controller.createFidner
        );
        this.router.get(this.path, this.controller.searchFidner);
        this.router.put(
            `${this.path}/:id`,
            handleValidation,
            this.controller.updateFinder
        );
        this.router.delete(`${this.path}/:id`, handleValidation, this.controller.deleteFinder);
    }
}

export default FinderRoutes;
