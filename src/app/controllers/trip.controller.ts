import {Request, Response} from "express";
import {ActorModel} from "../models/actor.model";
import {PipelineStage} from "mongoose";
import {TripModel} from "../models/trip.model";


class TripController {

    public create = async (req: any, res: Response) => {
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({msg: "Plase insert a valid Trip"});
        }
        try {
            const newTrip = new TripModel(req.body);
            const actor = req.authenticated;
            newTrip.manager = actor._id;
            if (!(actor.role.indexOf("MANAGER") > -1)) {
                return res.status(401).json('Only managers can create trips');
            }
            await newTrip.save();
            return res.status(201).json(newTrip);
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const trpList = await TripModel.find();
            return res.send(trpList);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    public get = async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const tripFound = await TripModel.findById(id);
            if (tripFound === null) {
                return res.status(404).send("Trip not found");
            } else return res.send(tripFound);
        } catch (error: any) {
            if (error.name === "CastError") {
                return res.status(400).send("Introduce valid id");
            }
            return res.status(500).send(error);
        }
    };

    public getFromAuth = async (req: any, res: Response) => {
        try {
            const tripFound = await TripModel.find({manager: req.authenticated._id})
            if (tripFound === null) {
                return res.status(404).send("Trip not found");
            } else return res.send(tripFound);
        } catch (error: any) {
            if (error.name === "CastError") {
                return res.status(400).send("Introduce valid id");
            }
            return res.status(500).send(error);
        }
    };

    public update = async (req: any, res: Response) => {
        const {id} = req.params;
        const trip = await TripModel.findById(id);
        if (req.authenticated._id !== trip?.manager) {
            return res.status(401).send('This manager does not have permissions to edit this trip');
        }
        if (trip?.published) {
            return res.status(400).send('Cannot update a published trip');
        }
        try {
            const newTrip = await TripModel.updateOne(
                {_id: id},
                {
                    $set: {...req.body, manager: req.authenticated._id},
                }
            );
            return res.send(newTrip);
        } catch (error: any) {
            if (error.name === "ValidationError")
                res.status(422).send(error);
            return res.status(500).send(error);
        }
    };

    public delete = async (req: any, res: Response) => {
        const {id} = req.params;
        const trip = await TripModel.findById(id);
        if (req.authenticated._id !== trip?.manager) {
            return res.status(401).send('This manager does not have permissions to delete this trip');
        }
        if (trip?.published) {
            return res.status(400).send('Cannot delete a published trip');
        }
        try {
            const result = await TripModel.findByIdAndDelete(id);
            if (!result) {
                return res.status(404).json({msg: "Trip not found"});
            }
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

    public cancel = async (req: any, res: Response) => {
        const {id} = req.params;
        const trip = await TripModel.findById(id);
        const reason = req.body.reason;
        if (req.authenticated._id !== trip?.manager) {
            return res.status(401).send('This manager does not have permissions to cancel this trip');
        }
        if (trip?.published) {
            return res.status(400).send('Cannot cancel a published trip');
        }
        if (trip && trip?.start_date?.getDate() > Date.now()) {
            return res.status(400).send('Cannot cancel a started trip');
        }
        try {
            const newTrip = await TripModel.updateOne(
                {_id: id},
                {
                    $set: {cancelled: true, reason},
                }
            );
            return res.send(newTrip);
        } catch (error: any) {
            if (error.name === "ValidationError")
                res.status(422).send(error);
            return res.status(500).send(error);
        }
    };

    public search = async (req: Request, res: Response) => {
        const {search} = req.query;
        const aggregate: PipelineStage[] = [];

        if (search?.length)
            aggregate.push({$match: {$text: {$search: `${search}`}}})
        try {
            let result = [];
            if (aggregate.length)
                result = await TripModel.aggregate(aggregate);
            if (!result) {
                return res.status(404).json({msg: "Trip not found"});
            }
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).send(error);
        }
    };

}

export default TripController;