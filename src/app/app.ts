import {Application} from "express";
import express from "express";
import cors from 'cors';
import admin from 'firebase-admin';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import mongoose, {set, connect} from "mongoose";
import {apiSettings, mongoConnectionSettings} from "../settings";
import {Routes} from "./util/routes.interface";
import logger from './logger/logger';

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
        this.connectToFirebase();
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
                openapi: '3.0.3',
                info: {
                    title: 'REST API Docs',
                    version: '1.0.0',
                },
            },
            apis: ['src/**/*.yaml'],
        }

        const specs = swaggerJSDoc(options)
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

    connectToDatabase(): void {
        if (this.env === 'development')
            set('debug', true)
        connect(mongoConnectionSettings.url, (error) => {
            if (error)
                logger.error('Error connecting to database: ', error)
            else
                logger.info('Connected to database')
        })
    }

    connectToFirebase(): void {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
            }),
            databaseURL: 'https://acme-explorer-auth.firebaseio.com'
        })
    }
}

export default App;