import React from "react";
import { data } from "./../../../public/db.js";
import { LuExternalLink } from "react-icons/lu";
import { getOriginalUrl } from "../../api/apiRequest.js";

const RecentShortener = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
      {data && data.length > 0 ? (
        <table className="w-full text-sm text-left">
          <tbody>
            {data.map((item, key) => (
              <tr
                key={key}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.originalUrl.slice(0, 80) + "......"}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-bold text-indigo-800 whitespace-nowrap dark:text-white flex"
                  onClick={()=>getOriginalUrl(item.shortUrl)}
                >
                  {item.shortUrl}{" "}
                  <span className="flex items-center gap-1">
                    <LuExternalLink />
                  </span>
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-bold text-sm text-dark-800 whitespace-nowrap dark:text-white"
                >
                  Clicks: {item.clicks}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Copy
                  </a>
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
