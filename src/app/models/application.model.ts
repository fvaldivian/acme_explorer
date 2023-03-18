import {model, Schema} from "mongoose";
import {ActorModel} from "./actor.model";
import {TripModel} from "./trip.model";
import {Application} from "../types/application";

const applicationSchema = new Schema({
    create_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'PENDING',
        require: "Kindly enter the application status",
        enum: ['PENDING', 'REJECTED', 'CANCELLED', 'ACCEPTED', 'DUE']
    },
    comments: {
        type: String,
        required: true,
    },
    explorer: {
        type: Schema.Types.ObjectId,
        ref: 'Actor',
        index: true
    },
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        index: true
    },
    denied: {
        type: Boolean
    },
    reason: {
        type: String,
        required: false
    },
    isPaid: {
        type: Boolean,
        require: false
    }
})

applicationSchema.pre('save', async function (next) {
    const actor = await ActorModel.findOne({_id: this.explorer}).exec();
    if (!(actor?.role.indexOf("EXPLORER") > -1)) {
        next(new Error('ExplorerRoleError'));
    }

    const trip = await TripModel.findOne({_id: this.trip}).exec();
    const now = new Date();
    if (!trip?.published || trip?.start_date < now || trip?.cancelled) {
        next(new Error('ApplicationError'));
    }
    next();
})


export const ApplicationModel = model<Application>('Application', applicationSchema)