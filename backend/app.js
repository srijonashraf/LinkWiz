import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import hpp from "hpp";
import dotenv from "dotenv";
import cors from "cors";
import publicRouter from "./src/router/public.js";

const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());

const corsOptions = {
  origin:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://linkwiz.netlify.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  rateLimit({
    windowMs: process.env.RATE_LIMIT_TIME,
    max: process.env.RATE_LIMIT_COUNT,
  })
);
app.use(mongoSanitize());

mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// Manually set CORS headers if needed
const isDevelopment = process.env.NODE_ENV === "development";
const allowedOrigin = isDevelopment
  ? "http://localhost:5173"
  : "https://linkwiz.netlify.app";

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/", publicRouter);

// Add a default route for testing
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

export default app;
