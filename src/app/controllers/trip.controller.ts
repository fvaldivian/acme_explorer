import { Request, Response } from "express";
import Trip from "../models/trip";

class TripController {
  public addTrip = async (req: Request, res: Response) => {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ msg: "Plase insert a valid Trip" });
    }
    try {
      const newTrip = new Trip(req.body);
      await newTrip.save();
      return res.status(201).json(newTrip);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  
  //get all trips
  public getAllTrips = async (req: Request, res: Response) => {
    try {
      const trpList = await Trip.find();
      return res.send(trpList);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
  
  //get a trip by id
  public getTrip = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tripFound = await Trip.findById(id);
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
  
  //update actor
  public updateTrip = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const {
        title,
        description,
        price,
        list_of_requirements,
        start_date,
        end_date,
        pictures,
        cancelled,
        reason,
      } = req.body;
      const newTrip = await Trip.updateOne(
        { _id: id },
        {
          $set: {
            title,
            description,
            price,
            list_of_requirements,
            start_date,
            end_date,
            pictures,
            cancelled,
            reason,
          },
        }
      );
      return res.send(newTrip);
    } catch (error: any) {
      if (error.name == "ValidationError") {
        res.status(422).send(error);
      }
      return res.status(500).send(error);
    }
  };
  
  //remove actor
  public deleteTrip = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const result = await Trip.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ msg: "Trip not found" });
      }
      return res.status(200).send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

export default TripController;