import {model, Schema} from "mongoose";

export interface interFinder {
    key_word: string
    low_price: number
    high_price: number
    from_date: Date
    to_date: Date
}

const FinderSchemma = new Schema({
    key_word: {
        type: String,
        require: 'Kindly enter the actor name'
    },
    low_price: {
        type: Number,
        min: 0
    },
    high_price: {
        type: Number,
        min: 0
    },
    from_Date: {
        type: Date,
        require: 'Kindly enter a start Date'
    },
    to_date: {
        type: Date,
        require: 'Kindly enter an end Date'
    }

})


export default model<interFinder>('Finder', FinderSchemma)