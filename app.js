import express from "express";
import morgan from "morgan";
import cors from "cors";
import noteRouter from "./routes/noteRouter.js";
import unknownEndpoint from "./utils/unknownEndpoint.js";
import connectToDB from "./utils/connectToDB.js";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

connectToDB(MONGODB_URI);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :status :body"));

app.use("/notes", noteRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
