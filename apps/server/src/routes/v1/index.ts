import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

const v1Router = Router();

//Auth middleware
v1Router.use(authenticate);

//Routes


export { v1Router };
