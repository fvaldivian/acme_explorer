import App from "./app/app";
import ActorRoutes from "./app/routes/actor.routes";
import TripRoutes from "./app/routes/trip.routes";
import ApplicationRoutes from "./app/routes/application.routes";
import ConfigRoutes from './app/routes/config.routes';
import admin from 'firebase-admin';
import FinderRoutes from "./app/routes/finder.routes";
import LoginRoutes from "./app/routes/login.routes";
import servicio from './app/key/acme-explorer-auth-firebase-adminsdk-w4ev5-c027c9ecad.json'

const app = new App([new ActorRoutes(), new TripRoutes(), new ApplicationRoutes(), new ConfigRoutes(), new FinderRoutes(), new LoginRoutes()]);

const serviceAccount = servicio;
        admin.initializeApp({
        // @ts-ignore
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://console.firebase.google.com/u/0/project/acme-explorer-auth/authentication/users'
    })

app.listen();