import {Request, Response} from "express";
import {ActorModel} from "../models/actor.model";

class ActorController {

    public create = async (req: Request, res: Response) => {
        if (
            !req.body.name ||
            !req.body.surname ||
            !req.body.email ||
            !req.body.role ||
            !req.body.password
        ) {
            return res.status(400).json({msg: "Please send a valid actor"});
        }

        const newActor = new ActorModel(req.body);
        try {
            const actor = await newActor.save();
            res.json(actor);
        } catch (err: any) {
            if (err.name === "ValidationError") {
                res.status(422).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const actors = await ActorModel.find();
            res.json(actors);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public get = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const actorFound = await ActorModel.findById(id).exec();
            if (actorFound) {
                res.status(200).json(actorFound);
            } else {
                res.status(404).send({msg: "Actor not found"});
            }
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public update = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!req.body) {
            return res.status(422).send("Invalid values")
        }
        try {
            const {role, name, surname, email, phone_number, address, isActivated} =
                req.body;
            const actor = await ActorModel.findOneAndUpdate(
                {_id: id},
                {
                    $set: {
                        role,
                        name,
                        surname,
                        email,
                        phone_number,
                        address,
                        isActivated,
                    },
                },
                {new: true}
            );
            if (actor) {
                res.status(200).json(actor);
            } else {
                res.status(404).send("Actor not found");
            }
        } catch (err: any) {
            if (err.name === "ValidationError") {
                res.status(422).send(err);
            }
            res.status(500).send(err);
        }
    };

    public delete = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const result = await ActorModel.findByIdAndDelete(id);
            if (result === null) {
                return res.status(404).send("Actor not found");
            } else {
                return res.send(result);
            }
        } catch (err) {
            return res.status(500).send(err).json();
        }
    }

}

export default ActorController;
