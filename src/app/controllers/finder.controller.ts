import {Request, Response} from "express";
import finderModel from "../models/finder.model";

class FinderController {

    public searchFinder = async (_req: Request, res: Response) => {
        try {
            const finders = await finderModel.find();
            return res.send(finders);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public createFinder = async (req: Request, res: Response) => {
        if (!req.body) {
            return res
                .status(400)
                .json({msg: "Please, insert a valid application"});
        }
        try {
            const newFinder = new finderModel(req.body);
            await newFinder.save();
            return res.status(201).json(newFinder);
        } catch (error) {
            return res.status(500).send(error);
        }
    };
    
    public updateFinder = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const {keyword, low_price, high_price, from_date, to_date} = req.body;
            const newFinder = await finderModel.updateOne(
                {_id: id},
                {keyword, low_price, high_price, from_date, to_date}
            );
            console.log(newFinder);
            if (newFinder.matchedCount === 0) {
                return res.status(404).send("Finder not found");
            } else return res.send(newFinder);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    public deleteFinder = async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const result = await finderModel.findByIdAndDelete(id);
            if (result === null) {
                res.status(404).json({msg: "Finder not found"});
            }
            res.status(200).json(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    };
}

export default FinderController;
