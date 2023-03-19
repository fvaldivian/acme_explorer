import { model, Schema } from 'mongoose';


const ApplicationsRatioSchema = new Schema({
  status: {
    type: String,
    enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED', 'REJECTED']
  },
  count:{
    type: Number
  },
  ratio: {
    type: Number
  }
}, { strict: false });

const DispersionMeasuresSchema = new Schema({
  average: {
    type: Number
  },
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  standard_desviation: {
    type: Number
  }
}, { strict: false });

const DashboardInformationSchema = new Schema({
  tripsPerManager:  DispersionMeasuresSchema ,
  applicationsPerTrip:  DispersionMeasuresSchema ,
  priceOfTrips:  DispersionMeasuresSchema ,
  applicationsRatioPerStatus: [ApplicationsRatioSchema]
}, { strict: false });

DashboardInformationSchema.index({ computationMoment: -1 });

export const ApplicationsRatio = model('ApplicationsRatio', ApplicationsRatioSchema)
export const DispersionMeasures = model('DispersionMeasures', DispersionMeasuresSchema)
export const DashboardInformation = model('DashboardInformation', DashboardInformationSchema)

