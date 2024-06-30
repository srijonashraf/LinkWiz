import Joi from "joi";
import { linkModel } from "../model/link.js";
import { generateShortUrl } from "../utils/shortener.js";
import { baseUrl } from "../constants/BaseUrl.js";

const createCollection = async (url, id) => {
  try {
    const response = await linkModel.create({ originalUrl: url, shortUrl: id });
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
    let id = generateShortUrl();
    let result;

    // Attempt to create collection entry, retry on duplicate key error
    while (true) {
      try {
        result = await createCollection(url, id);
        break;
      } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
          id = generateShortUrl(); // Generate new ID and retry
        } else {
          throw error;
        }
      }
    }

    const domain =
      process.env.NODE_ENV === "development"
        ? "localhost"
        : "linkwiz.netlify.app";

    // Respond with success message
    return res
      .status(200)
      .cookie(id, url, {
        httpOnly: false,
        sameSite: "None",
        secure: true,
        domain: domain,
      })
      .json({ status: "success", message: "Short URL created", data: result });
  } catch (error) {
    // Log error for debugging purposes
    console.error("Error occurred:", error);

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
    return res.redirect(response.originalUrl);
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};

export const fetchRecentLinkStats = async (req, res) => {
  try {
    //Get cookie object from body
    const reqBodyObject = req.body;

    // Validation schema
    const schema = Joi.object().pattern(
      Joi.string(),
      Joi.string().uri().required()
    );

    // Validate request body using Joi schema
    const { error } = schema.validate(reqBodyObject);

    if (error) {
      // Joi validation failed
      return res.status(400).json({
        status: "fail",
        message: "Invalid request body",
        error: error.details.map((err) => err.message),
      });
    }

    if (!reqBodyObject || Object.keys(reqBodyObject).length === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "No cookies provided" });
    }

    const recentUrls = Object.keys(reqBodyObject);

    const response = await linkModel
      .find({ shortUrl: { $in: recentUrls } })
      .exec();

    if (!response || response.length === 0) {
      return res
        .status(404)
        .json({ status: "fail", message: "Link is broken or not found" });
    }

    return res.status(200).json({ status: "success", data: response });
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};
