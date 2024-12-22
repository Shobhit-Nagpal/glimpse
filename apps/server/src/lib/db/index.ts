import * as Mongoose from "mongoose";

const DB_URI = process.env.DB_CONN_STRING as string;

export async function connectToDb() {
  try {
    if (!DB_URI) {
      throw new Error("DB URI isn't provided");
    }

    await Mongoose.connect(DB_URI);

    const db = Mongoose.connection;

    db.on("connected", () => {
      console.log("[DB]: Connect to database successfully!");
    });

    db.on("error", (error) => {
      console.error("[DB]: Connection error:", error);
    });

    db.on("disconnected", () => {
      console.error("[DB]: Disconnected with database");
    });

    process.on("SIGINT", async () => {
      await db.close();
      console.log("[DB]: Connection closed through terminal");
      process.exit(0);
    });
  } catch (err) {
    console.error("[DB]: Error connecting to databse", err);
    process.exit(1);
  }
}
