import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { createShortUrl } from "../../api/apiRequest";
import { errorToast, successToast } from "../../helper/toaster";
import fetchLinkListContext from "../../context/fetchLinkListContext";
import inputFocusContext from "../../context/inputFocusContext";

const CreateShortener = () => {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const { setFetchLinkList } = useContext(fetchLinkListContext);
  const { inputFocus } = useContext(inputFocusContext);

  console.log(inputFocus);

  const handleShortenLinkButton = async (e) => {
    e.preventDefault();
    if (input && input.length > 0) {
      const response = await createShortUrl(input);
      if (response) {
        successToast("Shorten link created!");
        setInput("");
        setFetchLinkList(Date.now());
      } else {
        errorToast("Please enter a valid Url!");
      }
    } else {
      errorToast("Enter the link first!");
    }
  };

  useEffect(() => {
    if (inputFocus) {
      inputRef.current.focus();
    }
  }, [inputFocus]);

  return (
    <div className="w-full sm:flex sm:flex-row flex-col gap-2 sm:space-y-0 space-y-2">
      <TextInput
        id="linkInput"
        type="text"
        placeholder="Enter the link here"
        className="sm:w-3/4 w-full"
        sizing="lg"
        required
        onChange={(e) => setInput(e.target.value)}
        value={input}
        ref={inputRef}
      />
      <Button
        className="bg-indigo-700 text-white font-medium sm:w-3/12 w-full rounded-md ring-0 ring-white hover:bg-indigo-800 flex items-center"
        onClick={handleShortenLinkButton}
      >
        <span className="text-lg">Shorten Link</span>
      </Button>
    </div>
  );
};

export default CreateShortener;
