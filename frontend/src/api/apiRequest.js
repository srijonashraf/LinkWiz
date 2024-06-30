import axios from "axios";
import { getBaseURL } from "./../utils/baseUrl";
import { Cookies } from "js-cookie";

const BASE_URL = getBaseURL();

export const createShortUrl = async (originalUrl) => {
  const URL = `${BASE_URL}/shorten`;

  try {
    const response = await axios.post(
      URL,
      { url: originalUrl },
      { withCredentials: true }
    );
    Cookies.set(response.data.shortUrl, response.data.originalUrl); //Set cookies manually
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

export const fetchRecentLinkStats = async (cookieObject) => {
  const URL = `${BASE_URL}/recent-links`;
  try {
    const response = await axios.post(URL, cookieObject, {
      withCredentials: true,
    });

    if (response.data.status === "success") {
      return response.data.data;
    } else {
      console.log("Failed to fetch recent link stats");
      return false;
    }
  } catch (error) {
    console.error("Error occurred while fetching recent link stats:", error);
    return false;
  }
};
