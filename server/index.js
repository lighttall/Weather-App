import express from "express";
const app = express();

import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import postRoutes from "./routes/post.js";
import userRoutes from "./routes/users.js";

import morgan from "morgan";

mongoose
  .connect("mongodb://localhost:27017/finalProject")
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log("could not connected to mongo ", err));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = 3900;
app.listen(PORT, () => console.log(`click http://localhost:${PORT}`));
