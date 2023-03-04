import {Request, Response} from "express";
import {ApplicationModel} from "../models/application.model";

class ApplicationController {

    public addApplication = async (req: Request, res: Response) => {
        if (!req.body.status) {
            return res.status(400).json({msg: "Please, insert a valid application"});
        }
        
        try {
            const newTripApplication = new ApplicationModel(req.body);
            console.log(newTripApplication)
            await newTripApplication.save();
            res.json(newTripApplication);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    public getAllApplications = async (req: Request, res: Response) => {
        try {
            const applications = await ApplicationModel.find();
            return res.send(applications);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public getApplicationById = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const applicationFound = await ApplicationModel.findById(id);
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
            const newApplication = await ApplicationModel.updateOne(
                {_id: id},
            )
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
            const result = await ApplicationModel.findByIdAndDelete(id);
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
            return res.status(400).json({msg: "Send denied reason"});
        }
        try {
            const {id} = req.params;
            const {reason} = req.body;
            const denied = true;
            const status = 'REJECTED';
            const newApplication = await ApplicationModel.updateOne(
                {_id: id},
                {reason, denied, status}
            );
            return res.send(newApplication);
        } catch (err: any) {
            return res.status(500).send(err);
        }
    };
    
    public approvedApplication = async (req: Request, res: Response) => {
        if (!req.body.reason) {
            return res.status(400).json({msg: "Send approved reason"});
        }
        try {
            const {id} = req.params;
            const {reason} = req.body;
            const denied = false;
            const status = 'ACCEPTED';
            const newApplication = await ApplicationModel.updateOne(
                {_id: id},
                {reason, denied, status}
            );
            return res.send(newApplication);
        } catch (err: any) {
            return res.status(500).send(err);
        }
    }
}

export default ApplicationController;