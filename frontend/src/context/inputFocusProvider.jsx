import React, { useState } from "react";
import inputFocusContext from "./inputFocusContext";

const InputFocusProvider = ({ children }) => {
  const [inputFocus, setInputFocus] = useState("");
  return (
    <inputFocusContext.Provider value={{ inputFocus, setInputFocus }}>
      {children}
    </inputFocusContext.Provider>
  );
};

export default InputFocusProvider;
