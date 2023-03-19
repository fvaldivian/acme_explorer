import { Request, Response } from "express";
import finderModel from "../models/finder.model";
import { TripModel } from "../models/trip.model";
import { getUserId } from "./auth.controller";
import { ObjectId } from "mongodb";
/***
 *  Hacer un nuevo modelo para guardar los datos
 *  Guardar cada cierto tiempo los datos segun la configuracion
 */
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
    //const idToken = req.header('idToken')
    //let authExplorerId = await getUserId(idToken)
    //let actor = String(authExplorerId) // revisar cuando funcione
    try {
      const ids = await TripModel.aggregate([
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
        { $project: { _id: 1 } },
      ]);

      const trips = [];
      for (let i = 0; i < ids.length; i++) {
        trips.push(ids[i]._id.toString());
      }
      const finder = new finderModel({
        keyword,
        low_price,
        high_price,
        from_date,
        to_date,
        trips,
      });
      const newFinder = await finder.save();
      res.status(200).send(newFinder);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public getTripsFinded = async (req: Request, res: Response) => {
    const idFinder = req.query.idFinder;
    try {
      let idsTrip = await finderModel.aggregate([
        { $match: { _id: new ObjectId(`${idFinder}`) } },
        { $project: { _id: 0, trips: 1 } },
      ]);
      idsTrip = idsTrip[0].trips;
      const trips = await TripModel.find({ _id: { $in: idsTrip } });
      console.log(trips);
      res.status(200).send(trips);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

export default FinderController;
