import axios from "axios";
import { getBaseURL } from "./../utils/baseUrl";

const BASE_URL = getBaseURL();

export const getOriginalUrl = async (shortUrl) => {
  const URL = `${BASE_URL}/shorten?url=${shortUrl}`;

  try {
    const response = await axios.get(URL);

    if (response.status === 301) {
      // Handle redirection if needed
      console.log("Redirecting to original URL...");
    } else if (response.data.status === "success") {
      return response.data;
    } else {
      console.log("Failed to fetch original Url");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createShortUrl = async (originalUrl) => {
  const URL = `${BASE_URL}/shorten`;

  try {
    const response = await axios.post(URL, { originalUrl });

    if (response.data.status === "success") {
      return response.data;
    } else {
      console.log("Failed to create short Url");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
