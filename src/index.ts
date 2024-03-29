import App from "./app/app";
import ActorRoutes from "./app/routes/actor.routes";
import TripRoutes from "./app/routes/trip.routes";
import ApplicationRoutes from "./app/routes/application.routes";
import ConfigRoutes from './app/routes/config.routes';
import FinderRoutes from "./app/routes/finder.routes";
import LoginRoutes from "./app/routes/login.routes";
import DashboardRoutes from "./app/routes/dashboard.routes";

const app = new App([new ActorRoutes(), new TripRoutes(), new ApplicationRoutes(), new ConfigRoutes(), new FinderRoutes(), new LoginRoutes(), new DashboardRoutes()]);
app.listen();