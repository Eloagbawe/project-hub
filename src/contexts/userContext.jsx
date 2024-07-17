import { createContext, useState } from "react";

export const UserContext = createContext(JSON.parse(localStorage.getItem('user')) || null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      { children }
    </UserContext.Provider>
  )
}
