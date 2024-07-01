import React from "react";
import CreateShortener from "../components/shortener/createShortener";
import RecentShortener from "../components/shortener/recentShortener";
import { Card } from "flowbite-react";
import { IoIosLink } from "react-icons/io";
const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-800">
      <h1 className="text-3xl md:text-5xl  font-bold text-white uppercase sm:my-8 my-6 text-center flex gap-1">
        Free URL Shortener
        <IoIosLink />
      </h1>
      <Card className="sm:w-3/4 lg:w-3/5 w-full p-5 bg-white hover:bg-white flex">
        <CreateShortener />
        <RecentShortener />
      </Card>
    </div>
  );
};

export default Landing;
