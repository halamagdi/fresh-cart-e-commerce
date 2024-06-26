import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const userContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("userToken"));

  function logout() {
    localStorage.removeItem("userToken");
    setToken(null);
    toast.success("Successfully Logged Out ✅");

  }
  return (
    <userContext.Provider value={{ token, setToken, logout }}>
      {children}
    </userContext.Provider>
  );
}
