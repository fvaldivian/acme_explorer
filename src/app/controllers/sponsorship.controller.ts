import {Request, Response} from "express";
import {SponsorshipModel} from '../models/sponsorship.model';

class SponsorshipController {

    public addSponsorship = async (req: Request, res: Response) => {
        if (!req.body.status) {
            return res.status(400).json({msg: "Please, insert a valid sponsorship"});
        }
        try {
            const newTripSponsorship = new SponsorshipModel(req.body);
            await newTripSponsorship.save();
            return res.status(201).json(newTripSponsorship);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    public getAllSponsorships = async (req: Request, res: Response) => {
        try {
            const sponsorships = await SponsorshipModel.find();
            return res.send(sponsorships);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public getSponsorshipById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const sponsorshipFound = await SponsorshipModel.findById(id);
            if (sponsorshipFound === null) {
                return res.status(404).json({msg: "Sponsorship not found"});
            } else return res.send(sponsorshipFound);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public updateSponsorship = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const newSponsorship = await SponsorshipModel.updateOne(
                {_id: id},
            )
            if (newSponsorship.matchedCount === 0) {
                return res.status(404).send("Sponsorship not found");
            } else return res.send(newSponsorship);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public deleteSponsorship = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const result = await SponsorshipModel.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({msg: "Sponsorship not found"});
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    public deniedSponsorship = async (req: Request, res: Response) => {
        if (!req.body.reason) {
            return res.status(400).json({msg: "Send denied reason"});
        }
        try {
            const {id} = req.params;
            const {reason} = req.body;
            const denied = true;
            const status = 'REJECTED';
            const newSponsorship = await SponsorshipModel.updateOne(
                {_id: id},
                {reason, denied, status}
            );
            return res.send(newSponsorship);
        } catch (err: any) {
            return res.status(500).send(err);
        }
    };

    public approvedSponsorship = async (req: Request, res: Response) => {
        if (!req.body.reason) {
            return res.status(400).json({msg: "Send approved reason"});
        }
        try {
            const {id} = req.params;
            const {reason} = req.body;
            const denied = false;
            const status = 'ACCEPTED';
            const newSponsorship = await SponsorshipModel.updateOne(
                {_id: id},
                {reason, denied, status}
            );
            return res.send(newSponsorship);
        } catch (err: any) {
            return res.status(500).send(err);
        }
    }
}

export default SponsorshipController;