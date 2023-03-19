export interface Application {
    create_date: Date
    status: string
    comments: string
    denied: boolean
    reason: string
    isPaid: boolean
    explorer: any
    trip: any
}