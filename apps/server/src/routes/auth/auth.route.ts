import { Router } from "express";
import { signIn, signUp } from "../../controllers/user.controller";
import passport from "passport";

const authRouter = Router();

//Local strategies (username and password)
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);

//Google OAuth
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
);

//GitHub OAuth
authRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["email", "profile"],
  }),
);

//Logout
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/")
})

export { authRouter };
