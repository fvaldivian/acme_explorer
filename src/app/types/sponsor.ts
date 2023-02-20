import Actor from "./actor";
import Trip from "./trip";

export default interface Sponsorship {
    banner: string
    payed: boolean
    sponsor: Actor
    trip: Trip
}