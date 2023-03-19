import { ApplicationModel } from "../models/application.model";
import { TripModel } from "../models/trip.model";
class DashboardService {
  public ratioApplications = async () => {
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
    return result;
  };

  public infoTripPrice = async () => {
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
      {
        $project: {
          average: '$average',
          min: '$min',
          max: '$max',
          standard_desviation: '$standard_desviation'
        }
      }
    ]);
    return result;
  };

  public applicationXTrip = async () => {
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

    return result;
  };

  public infoTripManager = async () => {
    const result = await TripModel.aggregate([
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
    return result;
  };
}

export default DashboardService;
