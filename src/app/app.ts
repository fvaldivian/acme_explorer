import {Application} from "express";
import express from "express";
import cors from 'cors';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import * as path from 'path'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import mongoose, {set, connect} from "mongoose";
import {apiSettings, mongoConnectionSettings} from "../settings";
import {Routes} from "./util/routes.interface";
import servicio from './key/acme-explorer-auth-firebase-adminsdk-w4ev5-c027c9ecad.json'

class App {
    app: Application
    env: string
    port: string | number
    routes: Routes[]

    constructor(routes: Routes[]) {
        this.app = express()
        this.port = apiSettings.port || 3333
        this.env = process.env.NODE_ENV || 'development'
        this.routes = routes
        this.start();
    }

    start(): void {
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`)
        })
    }

    async stop(): Promise<void> {
        await mongoose.connection.close()
    }

    private initializeRoutes(): void {
        this.routes.forEach((route) => {
            this.app.use('/', route.router)
        })
    }

    private initializeMiddlewares(): void {
        this.app.use(cors({
            origin: '*'
        }))
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    private initializeErrorHandling(): void {
        // this.app.use(errorMiddleware)
    }

    private initializeSwagger(): void {
        const options = {
            failOnErrors: true,
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'REST API Docs',
                    version: '1.0.0',
                },
            },
            apis: [path.join(__dirname, 'swagger.yaml')],
        }

        const specs = swaggerJSDoc(options)
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

    connectToDatabase(): void {
        console.log(process.env.MONGO_DB_HOST)
        if (this.env === 'development')
            set('debug', true)
        connect(mongoConnectionSettings.url, (error) => {
            if (error)
                console.log('Error connecting to database: ', error)
            else
                console.log('Connected to database')
        })
    }


    connectToFirebase(): void {
    //firebase config - start   
        this.app.use(function (_req, res, next) {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, idToken') // watch out, if a custom parameter, like idToken, is added in the header, it must to be declared here to avoid CORS error
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
            next()
        })

        /*const serviceAccount = servicio;
        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount.toString()),
        databaseURL: 'https://acme-explorer-auth.firebaseio.com'
    })}*/
    }
}

export default App