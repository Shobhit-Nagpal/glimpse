import { Router } from "express";

const vRouter = Router();

//Auth middleware
vRouter.use(authenticate)

//Routes


export { vRouter };
