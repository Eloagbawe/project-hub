import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [disappearId, setDisappearId] = useState(null);
  const [displayId, setDisplayId] = useState(null);

  const displayAlert = (alertObj) => {
    setAlert(alertObj);
    clearTimeout(disappearId);
    clearTimeout(displayId);
  
    setDisappearId(
      setTimeout(() => {
        setAlert({
          ...alertObj,
          end: true,
        });
      }, 2800)
    );
    setDisplayId(
      setTimeout(() => {
        setAlert(null);
      }, 3000)
    );
  };

  return (
    <AlertContext.Provider value={{ alert, displayAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
