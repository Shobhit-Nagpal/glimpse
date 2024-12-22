import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { vRouter } from "./routes/v1";
import { authRouter } from "./routes/auth/auth.route";

dotenv.config();

const API_VERSION = process.env.API_VERSION;
const ALLOWED_HOSTS = process.env.ALLOWED_HOSTS
  ? process.env.ALLOWED_HOSTS.split(",")
  : [];

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ALLOWED_HOSTS,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
);

//Routes
app.use("/auth", authRouter);
app.use(`/${API_VERSION}`, vRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
