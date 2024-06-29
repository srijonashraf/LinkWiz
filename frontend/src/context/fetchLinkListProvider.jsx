import React, { useState } from "react";
import fetchLinkListContext from "./fetchLinkListContext";

const FetchLinkListProvider = ({ children }) => {
  const [fetchLinkList, setFetchLinkList] = useState("");
  return (
    <fetchLinkListContext.Provider value={{ fetchLinkList, setFetchLinkList }}>
      {children}
    </fetchLinkListContext.Provider>
  );
};

export default FetchLinkListProvider;
