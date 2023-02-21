import {Router} from "express";
import handleValidation from "../middlewares/ValidationMiddleware";
import {createValidator} from "../validators/SponsorshipValidator";
import {Routes} from "../util/routes.interface";
import SponsorshipController from '../controllers/sponsorship.controller';

class SponsorshipRoutes implements Routes {
    public path = '/v1/sponsorships';
    public router = Router();
    public controller = new SponsorshipController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, createValidator, handleValidation, this.controller.addSponsorship);
        this.router.get(this.path, this.controller.getAllSponsorships);
        this.router.get(`${this.path}:id`, this.controller.getSponsorshipById);
        this.router.put(`${this.path}:id`, createValidator, handleValidation, this.controller.updateSponsorship);
        this.router.delete(`${this.path}:id`, this.controller.deleteSponsorship);
        this.router.patch(`${this.path}:id/denied`, this.controller.deniedSponsorship)
        this.router.patch(`${this.path}:id/approved`, this.controller.approvedSponsorship)
    }
}


export default SponsorshipRoutes;