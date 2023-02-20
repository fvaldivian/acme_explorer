import {model, Schema} from "mongoose";
import Stage from '../types/stage'
import Trip from "../types/trip";
import dateFormat from "dateformat";
import {customAlphabet} from "nanoid";
import {uppercase} from "nanoid-dictionary";
import {StageSchema} from "./stage.model";

export const TripSchema = new Schema<Trip>({
    ticker: {
        type: String,
        unique: true,
        validate: {
            validator: (value: string) => /^([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))-[A-Z]{4}$/.test(value),
            message: 'Ticker is not valid'
        }

    },
    title: {
        type: String,
        require: 'Kindly enter the trip title'
    },
    description: {
        type: String,
        require: 'Kindly enter the trip description'
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    list_of_requirements: {
        type: [String],
        require: 'Kindly enter the list of requirements for this trip'
    },
    start_date: {
        type: Date,
        require: true,
    },
    end_date: {
        type: Date,
        require: true,
    },
    pictures: {
        type: [{data: Buffer, contentType: String}],
        default: []
    },
    cancelled: {
        type: Boolean,
        require: false,
    },
    published: {
        type: Boolean,
        require: false,
    },
    reason: {
        type: String,
        required: false,
    },
    stages: [StageSchema],
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'Actor',
    }
});

TripSchema.index({ticker: 'text', title: 'text', description: 'text'}, {
    weights: {
        ticker: 10,
        title: 5,
        description: 1
    }
});


TripSchema.pre<Trip>('save', function (next) {
    const date = dateFormat(new Date(), "yymmdd");
    this.ticker = [date, customAlphabet(uppercase, 4)()].join('-')
    if (!this.cancelled)
        this.reason = "";
    next()
});

TripSchema.pre<Trip>('save', function (next) {
    let totalPrice = 0
    this.stages.map((stage: Stage) => {
        totalPrice += stage.price
    })
    this.price = totalPrice;
    next()
});

TripSchema.pre<Trip>('save', function (next) {
    let totalPrice = 0
    this.stages.map((stage: Stage) => {
        totalPrice += stage.price
    })
    this.price = totalPrice;
    next()
});

export const TripModel = model<Trip>("Trip", TripSchema);
