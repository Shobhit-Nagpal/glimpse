import { Router } from "express";
import { signIn, signUp } from "../../controllers/user.controller";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);

export { authRouter };
