export interface RatioApplication{
    status: string
    count: number
    ratio: number
}

export interface InformationDashboard{
    average: number
    min: number
    max: number
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
    ratio_application: [RatioApplication]
    price_per_trip: InformationDashboard
    application_per_trip: InformationDashboard
    trip_per_manager: InformationDashboard
}