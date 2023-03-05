import App from "./app/app";
import ActorRoutes from "./app/routes/actor.routes";
import TripRoutes from "./app/routes/trip.routes";
import ApplicationRoutes from "./app/routes/application.routes";
import ConfigRoutes from './app/routes/config.routes';
import admin from 'firebase-admin';
import FinderRoutes from "./app/routes/finder.routes";
import LoginRoutes from "./app/routes/login.routes";

const app = new App([new ActorRoutes(), new TripRoutes(), new ApplicationRoutes(), new ConfigRoutes(), new FinderRoutes(), new LoginRoutes()]);

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    }),
    databaseURL: 'https://console.firebase.google.com/u/0/project/acme-explorer-auth/authentication/users'
})

app.listen();