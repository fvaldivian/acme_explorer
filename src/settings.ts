import {config} from 'dotenv'

config()

const {
    MONGO_DB_HOST,
    MONGO_DB_PORT,
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
    MONGO_DB_NAME,
    API_PORT
} = process.env

export const mongoConnectionSettings = {
    url: `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}?authSource=admin`
}

export const apiSettings = {
    port: API_PORT
}
