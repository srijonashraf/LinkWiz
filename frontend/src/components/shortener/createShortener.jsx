import React from "react";
import { Button, TextInput } from "flowbite-react";

const CreateShortener = () => {
  return (
    <div className="w-full flex space-x-2">
      <TextInput
        id="linkInput"
        type="text"
        placeholder="Enter the link here"
        className="w-3/4"
        sizing="lg"
        required
      />
      <Button className="bg-indigo-700 text-white font-medium w-3/12 rounded-md ring-0 ring-white hover:bg-indigo-800 flex items-center">
        <span className="text-lg">Shorten Link</span>
      </Button>
    </div>
  );
};

export default CreateShortener;
