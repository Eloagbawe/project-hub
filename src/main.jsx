import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "./contexts/userContext";
import { AlertProvider } from "./contexts/alertContext";
import { ProjectProvider } from "./contexts/projectContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <ProjectProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </ProjectProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
