import {Schema, model} from "mongoose";

const ApplicationsRatioSchema = new Schema({
  status: {
    type: String,
    enum: ['PENDING', 'DUE', 'ACCEPTED', 'CANCELLED', 'REJECTED']
  },
  ratio: {
    type: Number
  }
}, { strict: false });

const DispersionMeasuresSchema = new Schema({
  average: {
    type: Number
  },
  minimum: {
    type: Number
  },
  maximum: {
    type: Number
  },
  standardDeviation: {
    type: Number
  }
}, { strict: false });

const DashboardInformationSchema = new Schema({
  tripsPerManager: { DispersionMeasuresSchema },
  applicationsPerTrip: { DispersionMeasuresSchema },
  priceOfTrips: { DispersionMeasuresSchema },
  applicationsRatioPerStatus: [ApplicationsRatioSchema],
  computationMoment: {
    type: Date,
    default: Date.now
  },
  rebuildPeriod: {
    type: String

  }
}, { strict: false });

DashboardInformationSchema.index({ computationMoment: -1 });

export const ApplicationsRatio = model('ApplicationsRatio', ApplicationsRatioSchema);
export const DispersionMeasures = model('DispersionMeasures', DispersionMeasuresSchema);
export const DashboardInformation = model('DashboardInformation', DashboardInformationSchema);
