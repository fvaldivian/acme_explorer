import { Request, Response } from "express";
import { ApplicationModel } from "../models/application.model";
import { TripModel } from "../models/trip.model";
import DashboardService from "../services/DashboardService";
import { CronJob, CronTime } from "cron";
import {
  ApplicationsRatio,
  DispersionMeasures,
  DashboardInformation,
} from "../models/dashboardInfo.model";
import finderModel from "../models/finder.model";

/***
 *  TO-DO:
 *  Hacer validaciones àra el dashboard
 *  Hacer modelo para dashboard y guardar los datos cada cierto tiempo (estuidar libreria para ello-revisar las
 *  Clases)
 */

class DashboardController {
  public rebuild_period = "*/10 * * * * *";
  public computedDashbordJob: any;
  
  public rebuildPeriod = function (req: Request, res: Response) {
    const rebuild_period = req.query.rebuild_period
    if(rebuild_period == null){
      res.status(400).send('missing query parameter \'?rebuildPeriod=*/10 * * * * *\'')
    }else{

    }
  }

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

      //const newRatio = new ApplicationsRatio(objetos)
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
      const newTripXManager = new DispersionMeasures(result[0]); //probando el modelo
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
      const newTripXManager = new DispersionMeasures(result[0]); // probando el modelo
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
      const newTripXManager = new DispersionMeasures(result[0]); // probando el modelo
      const dash = await newTripXManager.save();
      res.status(200).send(dash);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  public genereteDashboardInfo = async (req: Request, res: Response) => {
    const service = new DashboardService();
    const promises: any = [
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

    const applicationXtrips = new DispersionMeasures(
      objetoResultados.application_per_trip
    );
    const priceXtrip = new DispersionMeasures(objetoResultados.price_per_trip);
    const tripXmanager = new DispersionMeasures(
      objetoResultados.trip_per_manager
    );

    const dashboard = new DashboardInformation();
    dashboard.tripsPerManager = tripXmanager;
    dashboard.applicationsPerTrip = applicationXtrips;
    dashboard.priceOfTrips = priceXtrip;
    dashboard.applicationsRatioPerStatus = objetoResultados.ratio_application;
    const daashInfo = await dashboard.save();
    res.send(daashInfo);
  };

  public genereteDashboardInfoJob = () => {
    this.computedDashbordJob = new CronJob(
      this.rebuild_period,
      async () => {
        const service = new DashboardService();
        console.log(
          "Cron job submitted. Rebuild period: " + this.rebuild_period
        );
        const promises: any = [
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

        const applicationXtrips = new DispersionMeasures(
          objetoResultados.application_per_trip
        );
        const priceXtrip = new DispersionMeasures(
          objetoResultados.price_per_trip
        );
        const tripXmanager = new DispersionMeasures(
          objetoResultados.trip_per_manager
        );

        const dashboard = new DashboardInformation();
        dashboard.tripsPerManager = tripXmanager;
        dashboard.applicationsPerTrip = applicationXtrips;
        dashboard.priceOfTrips = priceXtrip;
        dashboard.applicationsRatioPerStatus =
          objetoResultados.ratio_application;
        try {
          await dashboard.save();
        } catch (error) {
          console.log(error);
        }
      },
      null,
      true,
      "Europe/Madrid"
    );
  };

  public getAllDashboard = async (req: Request, res: Response) => {
    try {
      const dashboards = await DashboardInformation.find();
      res.json(dashboards);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  public getLastDashboard = async (req: Request, res: Response) => {
    try {
      const dashboards = await DashboardInformation.findOne()
        .sort("-computationMoment")
        .limit(1);
      res.json(dashboards);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  public computeAveragePriceFinders = async () => {
    try {
      const result = await finderModel.aggregate([
        {
          $group: {
            _id: 0,
            avg_min_price: { $avg: "$price_from" },
            avg_max_price: { $avg: "$price_to" },
          },
        },
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  public computeTop10WordsFinders = async () => {
    try {
      const result = await finderModel.aggregate([
        {
          $group: {
            _id: "$keyword",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            keyword: "$_id",
            count: 1,
          },
        },
        { $limit: 10 },
        { $sort: { count: -1 } },
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  };

}

export default DashboardController;
