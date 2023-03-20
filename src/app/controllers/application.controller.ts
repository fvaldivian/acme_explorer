import {Request, Response} from "express";
import {ApplicationModel} from "../models/application.model";
import {ActorModel} from "../models/actor.model";
import {TripModel} from '../models/trip.model';
import {Application} from '../types/application';

class ApplicationController {

    public addApplication = async (req: Request, res: Response) => {
        if (!req.body.status) {
            return res.status(400).json({msg: "Please, insert a valid application"});
        }
        const actor = await ActorModel.findOne({_id: req.body.explorer}).exec();
        //const actor = req.authenticated
        if (!(actor?.role.indexOf("EXPLORER") > -1)) {
            res.status(401).json({msg: "Actor unauthorized to create an application trip"})
        }
        const trip = await TripModel.findOne({_id: req.body.trip}).exec();
        //console.log(trip)
        const now = new Date();
        console.log(now)
        // trip?.start_date < now  || 
        if (!trip?.published || trip?.cancelled) {
            res.status(401).json({msg: "Trip is not available to applicate for it"})
        }

        try {
            const newTripApplication = new ApplicationModel(req.body);
            //console.log(newTripApplication)
            const application = await newTripApplication.save()
            //console.log("Trip application saved to database: ", newTripApplication)
            //console.log(application)
            res.status(201).send(application);
        } catch (err) {
            return res.status(500).send(err);
        }
    };

    public getAllApplications = async (_req: Request, res: Response) => {
        try {
            const applications = await ApplicationModel.find();
            return res.send(applications);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public getApplicationById = async (req: any, res: Response) => {
        const {id} = req.params;
        // check if application is from auth explorer
        try {
            const applicationFound = await ApplicationModel.findById(id);
            // const authexplorerId = req.authenticated;
            // const authexplorer = String(authexplorerId);
            // let applicationExplorerId = applicationFound?.explorer
            // applicationExplorerId = String(applicationExplorerId)
            // if(authexplorer !== applicationExplorerId){
            //    return res.status(401).send('This explorer does have permissions to applicate this trip')
            // }
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

    public cancelAnApplication = async (req: any, res: Response) => {
        const applicationId = req.params.applicationId
        try {
            const applicationFound = await ApplicationModel.findById(applicationId);
            // const authexplorerId = req.authenticated;
            // const authexplorer = String(authexplorerId)
            // let applicationExplorerId = applicationFound?.explorer
            // applicationExplorerId = String(applicationExplorerId)
            // if (authexplorer !== applicationExplorerId) {
            //     return res.status(401).send('This explorer does have permissions to applicate this trip')
            // } else {
            if (
                applicationFound?.status === "PENDING" ||
                applicationFound?.status === "ACCEPTED"
            ) {
                ApplicationModel.findOneAndUpdate(
                    {_id: req.params.applicationId},
                    {status: "CANCELLED"},
                    {new: true},
                    (err, application) => {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.status(201).json(application);
                        }
                    }
                );
            } else {
                res.status(400).send({message: 'To cancel an application, must be pending or accepted'})
            }
            // }
        } catch (error) {
            res.status(500).send(error)
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
    };

    public dueATrip = async (req: any, res: Response) => {
        const applicationId = req.params.applicationId
        try {
            const applicationFound = await ApplicationModel.findById(applicationId);
            // const authexplorerId = req.authenticated;
            // const authexplorer = String(authexplorerId);
            // let applicationExplorerId = applicationFound?.explorer
            // applicationExplorerId = String(applicationExplorerId)
            // if (authexplorer !== applicationExplorerId) {
            //     return res.status(401).send('This explorer does have permissions to applicate this trip')
            // } else {
                if (applicationFound?.status === "PENDING") {
                    ApplicationModel.findOneAndUpdate(
                        {_id: req.params.applicationId},
                        {status: "DUE"},
                        {new: true},
                        function (err, application) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.status(201).json(application);
                            }
                        }
                    );
                } else {
                    res.status(400).send({message: 'An application must be pendind to due it'})
                }
            // }
        } catch (error) {
            res.status(500).send(error)
        }

    }

    public payForATrip = async (req: any, res: Response) => {
        const applicationId = req.params.applicationId
        try {
            const applicationFound = await ApplicationModel.findById(applicationId);
            // const authexplorerId = req.authenticated;
            // const authexplorer = String(authexplorerId);
            // let applicationExplorerId = applicationFound?.explorer
            // applicationExplorerId = String(applicationExplorerId)
            // if (authexplorer !== applicationExplorerId) {
            //     return res.status(401).send('This explorer does have permissions to applicate this trip')
            // } else {
                if (applicationFound?.status == "DUE") {

                    ApplicationModel.findOneAndUpdate(
                        {_id: req.params.applicationId},
                        {status: "ACCEPTED"},
                        {new: true},
                        function (err, application) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.status(201).json(application);
                            }
                        }
                    );
                } else {
                    res.status(400).send({message: 'The application must be in DUE status'})
                }
            // }
        } catch (error) {
            res.status(500).send(error)
        }
    };
}

export default ApplicationController;