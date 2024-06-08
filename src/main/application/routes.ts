import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { UserController } from "../controller/user.controller";
import { authenticate } from "../middleware/auth";

const routes = Router();
const authController = new AuthController();
const userController = new UserController();

const prefix = "/api";

// Rotas de autenticação
routes.post(`${prefix}/users/register`, authController.register);
routes.post(`${prefix}/users/login`, authController.login);

routes.use(authenticate);
routes.get(`${prefix}/getAccount`, userController.get);
routes.get(`${prefix}/bitcoin`, userController.getBitcoin);
routes.post(`${prefix}/create`, userController.post);

export { routes };
