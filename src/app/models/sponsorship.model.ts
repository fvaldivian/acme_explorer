import {model, Schema} from "mongoose";
import {ActorModel} from './actor.model';
import Actor from '../types/actor'
import interTrip from '../types/trip'
import {TripSchema} from "./trip";

export interface interSponsorship {
    banner: String
    payed: boolean
    sponsor: Actor
    trip: interTrip
}

const SponsorshipSchemma = new Schema({
    banner: {
        type: String,
        require: true
    },
    payed:{
        type: Boolean,
    },
    sponsor: {
        type: ActorModel,
        ref: 'Actor',
        index: true
    },

    trip: {
        type: TripSchema,
        ref: 'Trip'
    }
})


SponsorshipSchemma.pre('save', async function (callback) {

    const sponsor = await ActorModel.findById({_id: this._id}); 
    if (sponsor?.activated && sponsor.role === 'SPONSOR') {
        console.log("sponsor is active");
        this.payed = true;
    }else{
        console.log("isActivated false then sponsor ship is not payed");
    }
    console.log(this.payed);
    callback();
});

export default model<interSponsorship>('Sponsorship', SponsorshipSchemma)