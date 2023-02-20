import {Request, Response} from "express";
import Application from "../models/application.model";


class ApplicationController {

    public addTripApplication = async (req: Request, res: Response) => {
        if (!req.body.status) {
            return res.status(400).json({msg: "Please, insert a valid application"});
        }
        try {
            const newTripApplication = new Application(req.body);
            await newTripApplication.save();
            return res.status(201).json(newTripApplication);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    public getAllApplications = async (req: Request, res: Response) => {
        try {
            const applications = await Application.find();
            return res.send(applications);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public getApplicationById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const applicationFound = await Application.findById(id);
            if (applicationFound === null) {
                return res.status(404).json({msg: "Application not found"});
            } else return res.send(applicationFound);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public updateApplication = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const {status, comments} = req.body;
            const newApplication = await Application.updateOne(
                {_id: id},
                {status, comments}
            );
            console.log(newApplication);
            if (newApplication.matchedCount === 0) {
                return res.status(404).send("Application not found");
            } else return res.send(newApplication);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public deleteApplication = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const result = await Application.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({msg: "Application not found"});
            }
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    public deniedApplication = async (req: Request, res: Response) => {
        if (!req.body.reason) {
            return res.status(400).json({msg: "Send denie reason"});
        }
        try {
            const {id} = req.params;
            const {reason} = req.body;
            const denied = true;
            const newApplication = await Application.updateOne(
                {_id: id},
                {reason, denied}
            );
            return res.send(newApplication);
        } catch (err: any) {
            return res.status(500).send(err);
        }
    };
}

export default ApplicationController
