import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/errorHandler.middlewares";

// import routes
// import authRouter from "./routes/auth.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(json({ limit: "2mb" }));
app.use(morgan("dev"));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

// routes middleware
// app.use("/api", authRouter);

fs.readdirSync(path.join(__dirname, "routes")).map((file) =>
  app.use("/api", require("./routes/" + file).router)
);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`Connected to database successfully`);
  } catch (err) {
    console.log("Mongodb", err);
    console.log("Mongodb Message", err?.message);
  } finally {
    const port = process.env.PORT || 8000;
    app.listen(port, () =>
      console.log(`Server listening on http:localhost:${port}`)
    );
  }
}

start();
