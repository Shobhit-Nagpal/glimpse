import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware";

const v1Router = Router();

//Auth middleware
v1Router.use(authenticate);

v1Router.get("/idk", (req, res) => {
  res.send("Ok")
})

//Routes

export { v1Router };
