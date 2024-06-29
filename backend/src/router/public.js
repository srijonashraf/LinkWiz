import express from "express";
import {
  createShortUrl,
  fetchRecentLinkStats,
  getOriginalUrl,
} from "../controller/linkController.js";

const publicRouter = express.Router();

publicRouter.post("/shorten", createShortUrl);
publicRouter.get("/shorten", getOriginalUrl);
publicRouter.get("/recent-links", fetchRecentLinkStats);

export default publicRouter;
