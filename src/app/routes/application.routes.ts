import { Router } from "express";
import ApplicationController from "../controllers/application.controller";
import { createValidator } from "../validators/ApplicationValidation";
import handleValidation from "../middlewares/ValidationMiddleware";
import { Routes } from "../util/routes.interface";

class ApplicationRoutes implements Routes {
  public path = "/v1/applications";
  public router = Router();
  public controller = new ApplicationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path,
      createValidator,
      handleValidation,
      this.controller.addTripApplication
    );
    this.router.get(this.path, this.controller.getAllApplications);
    this.router.get(`${this.path}/:id`, this.controller.getApplicationById);
    this.router.put(
      `${this.path}/:id`,
      createValidator,
      handleValidation,
      this.controller.updateApplication
    );
    this.router.delete(`${this.path}/:id`, this.controller.deleteApplication);
    this.router.patch(`${this.path}/:id/denied`, this.controller.deniedApplication);
  }
}

export default ApplicationRoutes;
