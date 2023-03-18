import { Request, Response } from "express";
import { ApplicationModel } from "../models/application.model";
import { TripModel } from "../models/trip.model";

/***
 *  TO-DO:
 *  Hacer validaciones àra el dashboard
 *  Hacer modelo para dashboard y guardar los datos cada cierto tiempo (estuidar libreria para ello-revisar las 
 *  Clases)
 */

class DashboardController {
  public ratioApplications = async (_req: Request, res: Response) => {
    try {
      const result = await ApplicationModel.aggregate([
        {
          $group: {
            _id: "$status",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).send(result);

    } catch (error) {
      res.status(500).send(error);
    }
  };

  public infoTripPrice = async (_req: Request, res: Response) => {
    try {
      const result = await TripModel.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            average: { $avg: "$price" },
            min_price: { $min: "$price" },
            max_price: { $max: "$price" },
            standard_desviation: { $stdDevPop: "$price" },
          },
        },
      ]);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public applicationXTrip = async (_req: Request, res: Response) => {
    try {
      const result = await ApplicationModel.aggregate([
        { $match: {} },
        {
          $group: {
            _id: "$trip",
            totalApplicationsXTrip: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            average: { $avg: "$totalApplicationsXTrip" },
            min_application_per_trip: { $min: "$totalApplicationsXTrip" },
            max_application_per_trip: { $max: "$totalApplicationsXTrip" },
            standard_desviation: { $stdDevPop: "$totalApplicationsXTrip" },
          },
        },
      ]);

      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public infoTripManager = async (_req: Request, res: Response) => {
    try {
      const result = await TripModel.aggregate([
        { $match: {} },
        { $group: { _id: "$manager", total: { $sum: 1 } } },
        {
          $group: {
            _id: null,
            average: { $avg: "$total" },
            min_trip_per_manager: { $min: "$total" },
            max_trip_per_manager: { $max: "$total" },
            standard_desviation: { $stdDevPop: "$total" },
          },
        },
      ]);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public genereteDashboardInfo = async (req: Request, res: Response) =>{
    
  }

}

export default DashboardController;
