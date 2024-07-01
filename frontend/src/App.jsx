import React from "react";
import Landing from "./pages/landing";
import AppNavbar from "./components/shared/appNavbar";
import { Toaster } from "react-hot-toast";
import FetchLinkListProvider from "./context/fetchLinkListProvider";
import FooterComponent from "./components/footer/footer";
import InputFocusProvider from './context/inputFocusProvider';

const App = () => {
  return (
    <div>
      <FetchLinkListProvider>
        <InputFocusProvider>
          <Toaster position="bottom-center" />
          <AppNavbar />
          <Landing />
          <FooterComponent />
        </InputFocusProvider>
      </FetchLinkListProvider>
    </div>
  );
};

export default App;
