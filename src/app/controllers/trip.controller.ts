import {Request, Response} from "express";
import {TripModel} from "../models/trip";
import {ActorModel} from "../models/actor.model";
import {PipelineStage} from "mongoose";


class TripController {

    public create = async (req: Request, res: Response) => {
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({msg: "Plase insert a valid Trip"});
        }
        try {
            const newTrip = new TripModel(req.body);
            const actor = await ActorModel.findOne({_id: newTrip.manager}).exec();
            if (actor === null || !(actor.role.indexOf("MANAGER") > -1)) {
                throw new Error('Only managers can create trips');
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

    public update = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const newTrip = await TripModel.updateOne(
                {_id: id},
                {
                    $set: {...req.body},
                }
            );
            return res.send(newTrip);
        } catch (error: any) {
            if (error.name === "ValidationError")
                res.status(422).send(error);
            return res.status(500).send(error);
        }
    };

    public delete = async (req: Request, res: Response) => {
        const {id} = req.params;
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