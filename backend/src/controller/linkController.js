import Joi from "joi";
import { linkModel } from "../model/link.js";
import { generateShortUrl } from "../utils/shortener.js";
const createCollection = async (url, id) => {
  try {
    const response = await linkModel.create({
      originalUrl: url,
      shortUrl: id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const createShortUrl = async (req, res) => {
  const input = req.body;
  let url = "";
  try {
    // Validation schema
    const schema = Joi.object({
      url: Joi.string().uri().required(),
    });

    // Validate input
    const { error, value } = schema.validate(input);
    // Show error in case of invalid link
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: "Object validation failed",
        error: error.details,
      });
    }

    url = value.url;

    // Generate short id
    const id = generateShortUrl();

    // Attempt to create collection entry
    const result = await createCollection(url, id);

    if (!result) {
      return res
        .status(200)
        .json({ status: "fail", message: "Failed to create short url" });
    }

    // Respond with success message
    return res
      .status(200)
      .cookie(id, url, { httpOnly: true, sameSite: "None", secure: false })
      .json({ status: "success", message: "Short Url created", data: result });
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error occurred:", error);

    // Handle MongoDB duplicate key error with retry
    if (error.name === "MongoServerError" && error.code === 11000) {
      const id = generateShortUrl();
      const retryResult = await createCollection(url, id);

      // Retry success response
      if (retryResult) {
        return res
          .status(200)
          .cookie(id, url, { httpOnly: true, sameSite: "None", secure: false })
          .json({
            status: "success",
            message: "Short URL created (after retry)",
            data: retryResult,
          });
      }
    }

    // Handle other errors
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};

export const getOriginalUrl = async (req, res) => {
  try {
    //Extract Url from query
    const { url } = req.query;

    //Fetch the collection which matched the short url
    const response = await linkModel.findOneAndUpdate(
      { shortUrl: url },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!response) {
      return res
        .status(200)
        .json({ status: "fail", message: "Link is broken or not found" });
    }

    //Redirect to original url
    res.redirect(response.originalUrl);
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};

export const fetchRecentLinkStats = async (req, res) => {
  try {
    //Extract short urls from cookies
    const recentUrls = Object.keys(req.cookies);

    // Fetch the collection which matches the short URLs
    const response = await linkModel
      .find({ shortUrl: { $in: recentUrls } })
      .exec();

    if (!response || response.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Link is broken or not found" });
    }

    res.status(200).json({ status: "success", data: response });
  } catch (error) {
    //Log errors for debugging
    console.error("Error occurred:", error);

    //Send error response
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};
