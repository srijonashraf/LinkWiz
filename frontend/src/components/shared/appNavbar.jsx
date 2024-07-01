import React, { useContext } from "react";
import { Button, Navbar } from "flowbite-react";
import { LuExternalLink } from "react-icons/lu";
import inputFocusContext from "../../context/inputFocusContext";

const AppNavbar = () => {
  const { setInputFocus } = useContext(inputFocusContext);
  return (
    <Navbar fluid className="sm:mx-5 mx-auto py-5">
      <Navbar.Brand href="#">
        <span className="flex items-center gap-1 self-center whitespace-nowrap text-xl font-bold text-indigo-800">
          <LuExternalLink />
          LinkWiz
        </span>
      </Navbar.Brand>
      <Button
        onClick={() => setInputFocus(Date.now())}
        className="bg-indigo-700 text-white font-medium px-3 rounded-md ring-0 ring-white hover:bg-indigo-800"
      >
        Get Started
      </Button>
    </Navbar>
  );
};

export default AppNavbar;
