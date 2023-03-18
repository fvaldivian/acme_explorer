import {Router} from "express";
import handleValidation from "../middlewares/ValidationMiddleware";
import {createValidator} from "../validators/ApplicationValidator";
import {Routes} from "../util/routes.interface";
import ApplicationController from "../controllers/application.controller";

class ApplicationRoutes implements Routes {
    public path = '/v1/applications';
    public router = Router();
    public controller = new ApplicationController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, createValidator, handleValidation, this.controller.addApplication);
        this.router.get(this.path, this.controller.getAllApplications);
        this.router.get(`${this.path}/:id`, this.controller.getApplicationById);
        this.router.put(`${this.path}/:id`, createValidator, handleValidation, this.controller.updateApplication);
        this.router.delete(`${this.path}/:id`, this.controller.deleteApplication);
        this.router.patch(`${this.path}/:id/denied`, this.controller.deniedApplication)
        this.router.patch(`${this.path}/:id/approved`, this.controller.approvedApplication)
    }
}


export default ApplicationRoutes;