import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import { v1Router } from "./routes/v1";
import { authRouter } from "./routes/auth/auth.route";
import { COOKIE_MAX_AGE } from "./consts";
import passport from "passport";
import { initPassport } from "./lib/auth/passport";
import { connectToDb } from "./lib/db";

dotenv.config();

const API_VERSION = process.env.API_VERSION;
const ALLOWED_HOSTS = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(",")
  : [];

const PORT = process.env.PORT;

const app = express();

app.options("*", cors());

app.use(
  cors({
    origin: ALLOWED_HOSTS,
    methods: "GET, POST, PATCH, PUT, DELETE",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: COOKIE_MAX_AGE },
  }),
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

initPassport();

connectToDb();

// Health check
app.get("/healthz", (_req, res) => {
  res.send("Ok");
});

//Routes
app.use("/api/auth", authRouter);
app.use(`/api/${API_VERSION}`, v1Router);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
