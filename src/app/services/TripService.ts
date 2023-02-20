class TripService {

    // async createInterestingPlaces(places: InterestingPlaces[]) {
    //     await InterestingPlacesModel.insertMany(places);
    // }
    //
    // async removeInterestingPlaces(id: string) {
    //     await InterestingPlacesModel.deleteMany({ routeId: id });
    // }
    //
    // async listInterestingPlaces(id: string): Promise<InterestingPlaces[]> {
    //     return InterestingPlacesModel.find({ routeId: id }).exec()
    // }

}

const tripService = new TripService();
export default tripService;