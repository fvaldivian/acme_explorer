import App from "./app/app";
import ActorRoutes from "./app/routes/actor.routes";

const app = new App([new ActorRoutes()]);
app.listen();