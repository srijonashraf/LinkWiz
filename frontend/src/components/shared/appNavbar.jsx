import React from "react";
import { Button, Navbar } from "flowbite-react";
import { LuExternalLink } from "react-icons/lu";

const AppNavbar = () => {
  return (
    <Navbar fluid className="sm:mx-5 mx-auto py-5">
      <Navbar.Brand href="#">
        <span className="flex items-center gap-1 self-center whitespace-nowrap text-xl font-bold text-indigo-800">
          <LuExternalLink />
          Flowbite React
        </span>
      </Navbar.Brand>
      <Button className="bg-indigo-700 text-white font-medium px-1 rounded-md ring-0 ring-white hover:bg-indigo-800">
        Get Started
      </Button>
    </Navbar>
  );
};

export default AppNavbar;
