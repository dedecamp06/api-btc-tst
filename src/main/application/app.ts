import express, { Express } from "express";
import { routes } from "./routes";
import { connectDB } from "../../infra/mongodb/config/config";

const app: Express = express();

app.use(express.json());
app.use(routes);

(async () => {
  await connectDB();
})();

export { app };
