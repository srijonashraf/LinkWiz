import React, { useContext, useEffect, useState } from "react";
import { LuExternalLink } from "react-icons/lu";
import { fetchRecentLinkStats } from "../../api/apiRequest.js";
import Cookies from "js-cookie";
import { successToast } from "../../helper/toaster.js";
import fetchLinkListContext from "../../context/fetchLinkListContext.js";

const RecentShortener = () => {
  const [data, setData] = useState([]);

  const { fetchLinkList, setFetchLinkList } = useContext(fetchLinkListContext);

  console.log(fetchLinkList);
  const fetchData = async () => {
    try {
      const cookies = Cookies.get();
      const response = await fetchRecentLinkStats(cookies);
      setData(response);
    } catch (error) {
      console.error("Error fetching recent link stats:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchLinkList]);

  const handleLinkClick = async (shortUrl) => {
    setFetchLinkList(Date.now());
    window.open(
      `${import.meta.env.VITE_BACKEND_URL_DEV}/shorten?url=${shortUrl}`,
      "_blank"
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 max-w-full">
      {data && data.length > 0 ? (
        <table className="w-full min-w-max text-sm text-left">
          <tbody>
            {data.map((item, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[300px] overflow-hidden overflow-ellipsis"
                >
                  {item.originalUrl.slice(0, 80) + "......"}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-bold text-indigo-800 whitespace-nowrap dark:text-white cursor-pointer"
                >
                  <div className="flex items-center">
                    <span
                      onClick={() => handleLinkClick(item.shortUrl)}
                      className="flex items-center gap-1"
                    >
                      <span className="max-w-[200px] overflow-hidden overflow-ellipsis">
                        {item.shortUrl}
                      </span>
                      <LuExternalLink />
                    </span>
                  </div>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-bold text-sm text-dark-800 whitespace-nowrap dark:text-white"
                >
                  Clicks: {item.clicks}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${import.meta.env.VITE_BACKEND_URL_DEV}/shorten?url=${
                          item.shortUrl
                        }`
                      );
                      successToast("Copied short URL");
                    }}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                  >
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default RecentShortener;
