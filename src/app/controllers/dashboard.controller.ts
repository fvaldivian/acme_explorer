import { Request, Response } from "express";
import { ApplicationModel } from "../models/application.model";
import { TripModel } from "../models/trip.model";
import DashboardService from "../services/DashboardService";
import { RatioApplication } from "../types/dashboard";
import { DashboardModel } from "../models/dashboard.model";
import { InformationDashboardModel } from "../models/informationDashboard.model";
import { ApplicationRatioModel } from "../models/ratioApplication.model";
import cron from 'node-cron'
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
        { $group: { _id: "$status", count: { $sum: 1 } } },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
            statuses: { $push: { status: "$_id", count: "$count" } },
          },
        },
        { $unwind: "$statuses" },
        {
          $addFields: {
            "statuses.ratio": { $divide: ["$statuses.count", "$total"] },
          },
        },
        {
          $project: {
            _id: 0,
            status: "$statuses.status",
            count: "$statuses.count",
            ratio: "$statuses.ratio",
          },
        },
      ]);
      //const newRatio = new ApplicationRatioModel(result)
      //const ratio = await newRatio.save()
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
            min: { $min: "$price" },
            max: { $max: "$price" },
            standard_desviation: { $stdDevPop: "$price" },
          },
        },
      ]);
      const newTripXManager = new InformationDashboardModel(result[0]); //probando el modelo
      const dash = await newTripXManager.save();
      res.status(200).send(dash);
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
            min: { $min: "$totalApplicationsXTrip" },
            max: { $max: "$totalApplicationsXTrip" },
            standard_desviation: { $stdDevPop: "$totalApplicationsXTrip" },
          },
        },
      ]);
      const newTripXManager = new InformationDashboardModel(result[0]); // probando el modelo
      const dash = await newTripXManager.save();
      res.status(200).send(dash);
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
            min: { $min: "$total" },
            max: { $max: "$total" },
            standard_desviation: { $stdDevPop: "$total" },
          },
        },
      ]);
      const newTripXManager = new InformationDashboardModel(result[0]); // probando el modelo
      const dash = await newTripXManager.save();
      res.status(200).send(dash);
    } catch (error) {
      res.status(500).send(error);
    }
  };


  public genereteDashboardInfo = async (req: Request, res: Response) => {
    const service = new DashboardService();
    const promises = [
      Promise.resolve(service.ratioApplications()),
      Promise.resolve(service.infoTripPrice()),
      Promise.resolve(service.infoTripManager()),
      Promise.resolve(service.applicationXTrip()),
    ];

    const resultado = await Promise.all(promises);

    const objetoResultados = {
      ratio_application: resultado[0],
      price_per_trip: resultado[1][0],
      application_per_trip: resultado[2][0],
      trip_per_manager: resultado[3][0],
    };

    const applicationXtrips = new InformationDashboardModel(objetoResultados.application_per_trip)
    const priceXtrip = new InformationDashboardModel(objetoResultados.price_per_trip)
    const tripXmanager = new InformationDashboardModel(objetoResultados.trip_per_manager)

    //const dashboard = new DashboardModel(applicationXtrips, priceXtrip, tripXmanager)
    /*
   const dash = new DashboardModel({
      trip_per_manager: objetoResultados.trip_per_manager,
      application_per_trip: objetoResultados.application_per_trip,
      price_per_trip: objetoResultados.price_per_trip,
      ratio_application: objetoResultados.ratio_application,
    });*/
    res.send(objetoResultados.application_per_trip);
  };

  public prueba = async (req: Request, res: Response) => {
    cron
    res.send("hola")
  };
}

export default DashboardController;
