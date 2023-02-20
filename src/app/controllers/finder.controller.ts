import { Request, Response } from "express";
import finderModel from "../models/finder.model";
import Finder from "../types/finder";
import TripModel from "../models/trip.model";
import Trip from "../types/trip";

class FinderController {
  //get finders
  public searchFidner = async (_req: Request, res: Response) => {
    try {
      const finders = await finderModel.find();
      return res.send(finders);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  // create finder
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

  // update finder
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
        return res.status(404).send("Application not found");
      } else return res.send(newFinder);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  //remove finder by id
  public deleteFinder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await finderModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ msg: "Fidner not found" });
      }
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  };

  public searchTrips = function (req: Request, res: Response) {
    const { id } = req.params;
    finderModel.findById(id, function (err: any, finder: Finder) {
      if (err) {
        res.send(err);
      } else {
        TripModel.find(
          {
            price: { $gt: finder.low_price, $lt: finder.high_price },
            start_date: { $gt: finder.from_date },
            end_date: { $lt: finder.to_date },
            $text: { $search: finder.keyword },
          },
          function (err: any, trips: Trip) {
            if (err) {
              res.send(err);
            } else {
              res.send(trips);
            }
          }
        );
      }
    });
  };
}

export default FinderController;
