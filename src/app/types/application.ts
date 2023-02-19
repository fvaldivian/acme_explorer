export default interface TripApplication {
    create_date: Date
    status: string
    comments: string
    denied: boolean
    reason: string
    isPaid: boolean
}