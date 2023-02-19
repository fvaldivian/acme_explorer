import App from "./app/app";
import ActorRoutes from "./app/routes/actor.routes";
import TripRoutes from "./app/routes/trip.routes";
import ApplicationRoutes from "./app/routes/application.routes";

const app = new App([new ActorRoutes(), new TripRoutes(), new ApplicationRoutes()]);
app.listen();