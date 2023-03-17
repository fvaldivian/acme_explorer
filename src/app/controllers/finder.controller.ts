import { Request, Response } from "express";
import finderModel from "../models/finder.model";
import { TripModel } from "../models/trip.model";
/***
 *  Hacer un nuevo modelo para guardar los datos
 *  Guardar cada cierto tiempo los datos segun la configuracion
 */
class FinderController {
  public searchFidner = async (_req: Request, res: Response) => {
    try {
      const finders = await finderModel.find();
      return res.send(finders);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  public createFidner = async (req: Request, res: Response) => {
    if (!req.body) {
      return res
        .status(400)
        .json({ msg: "Please, insert a valid application" });
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
    const { id } = req.params;
    try {
      const { keyword, low_price, high_price, from_date, to_date } = req.body;
      const newFinder = await finderModel.updateOne(
        { _id: id },
        { keyword, low_price, high_price, from_date, to_date }
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
    const { id } = req.params;
    try {
      const result = await finderModel.findByIdAndDelete(id);
      if (result === null) {
        res.status(404).json({ msg: "Fidner not found" });
      }
      res.status(200).json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public findTrip = async (req: Request, res: Response) => {
    const { keyword, low_price, high_price, from_date, to_date } = req.body;
    const from_date_typed = new Date(from_date);
    const to_date_typed = new Date(to_date);

    try {
      const result = await TripModel.aggregate([
        {
          $match: {
            $and: [
              {
                $or: [
                  { title: { $regex: new RegExp(keyword, "i") } },
                  { description: { $regex: new RegExp(keyword, "i") } },
                  { ticker: { $regex: new RegExp(keyword, "i") } },
                ],
              },
              { price: { $gte: low_price, $lte: high_price } },
              { start_date: { $gte: from_date_typed } },
              { start_date: { $lte: to_date_typed } },
            ],
          },
        },
      ]);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

export default FinderController;
