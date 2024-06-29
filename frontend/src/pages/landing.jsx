import React from "react";
import CreateShortener from "../components/shortener/createShortener";
import RecentShortener from "../components/shortener/recentShortener";
import { Card } from "flowbite-react";
import { IoIosLink } from "react-icons/io";
const Landing = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-slate-800">
      <h1 className="text-3xl md:text-5xl font-bold text-white uppercase my-8 text-center flex gap-1">
        Free URL Shortener
        <IoIosLink />
      </h1>
      <Card href="#" className="sm:w-3/6 w-3/4 p-5 bg-white hover:bg-white">
        <CreateShortener />
        <RecentShortener />
      </Card>
    </div>
  );
};

export default Landing;
