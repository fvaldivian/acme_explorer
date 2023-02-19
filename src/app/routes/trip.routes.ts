import { Router } from "express";
import TripController from "../controllers/trip.controller";
import { createValidator } from "../validators/TripValidation";
import { Routes } from "../util/routes.interface";
import handleValidation from "../middlewares/ValidationMiddleware";

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
      this.controller.addTrip
    );
    this.router.get(this.path, this.controller.getAllTrips);
    this.router.get(`${this.path}:id`, this.controller.getTrip);
    this.router.put(
      `${this.path}:id`,
      createValidator,
      handleValidation,
      this.controller.updateTrip
    );
    this.router.delete(`${this.path}:id`, this.controller.deleteTrip);
  }
}

export default TripRoutes;
