export interface RatioApplication{
    _id: any
    total: number
}

export interface PricePerTrip{
    average: number
    min_price: number
    max_price: number
    standard_desviation: number
}

export interface ApplicationPerTrip{
    average: number
    min_price: number
    max_price: number
    standard_desviation: number
}

export interface TripPerManager{
    average: number
    min_price: number
    max_price: number
    standard_desviation: number
}


export interface Dashboard{
    ratio_application: RatioApplication
    price_per_trip: PricePerTrip
    application_per_trip: ApplicationPerTrip
    trip_per_manager: TripPerManager
}