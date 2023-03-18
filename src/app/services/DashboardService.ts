import { ApplicationModel } from '../models/application.model';
import { TripModel } from '../models/trip.model';
class DashboardService {

    public ratioApplications = async ( ) => {
        try {
          const result = await ApplicationModel.aggregate([
            {
              $group: {
                _id: "$status",
                total: { $sum: 1 },
              },
            },
          ]);
          return result
    
        } catch (error) {
          throw error
        }
      };

    public infoTripPrice = async ( ) => {
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
          return result
        } catch (error) {
          console.log(error)
        }
      };

    public applicationXTrip = async ( ) => {
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
    
          return result
        } catch (error) {
          console.log(error)
        }
      };

    public infoTripManager = async ( ) => {
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
          return result
        } catch (error) {
          console.log(error)
        }
      };
}

export default DashboardService