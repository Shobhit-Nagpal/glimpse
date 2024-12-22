import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

const vRouter = Router();

//Auth middleware
vRouter.use(authenticate);

//Routes


export { vRouter };
