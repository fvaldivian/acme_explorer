import {model, Schema} from "mongoose";
import Finder from '../types/finder'
import {lowerPriceValidator, higherPriceValidator} from "../validators/finderCustomValidators";

const FinderSchema = new Schema({
    keyword: {
        type: String,
        require: 'Kindly enter the keyword',
    },
    low_price: {
        type: Number,
        min: 0,
        require: 'Kindly enter lower price',
        validate: [lowerPriceValidator, 'Lower price must be lower or equal than higher price']
    },
    high_price: {
        type: Number,
        min: 0,
        require: 'Kindly enter highest price',
        validate: [higherPriceValidator, 'Higher price must be lower or equal than lower price']
    },
    from_date: {
        type: Date,
        require: 'Kindly enter a start Date'
    },
    to_date: {
        type: Date,
        require: 'Kindly enter an end Date'
    }
})

export default model<Finder>('Finder', FinderSchema)