import { Router } from "express";
import { signIn, signUp } from "../../controllers/user.controller";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;

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

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
);

//GitHub OAuth
authRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["read:user", "user:email"],
  }),
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
);

//Logout
authRouter.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
  });
  res.redirect("/");
});

export { authRouter };
