import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./contexts/userContext";
import { AlertProvider } from "./contexts/alertContext";
import { ProjectProvider } from "./contexts/projectContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <AlertProvider>
            <ProjectProvider>
              <App />
            </ProjectProvider>
          </AlertProvider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
