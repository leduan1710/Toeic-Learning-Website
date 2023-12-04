import { jwtDecode } from "jwt-decode";
import React from "react";
import { useState, useEffect, createContext } from "react";
import { toast } from "react-toastify";
const UserContext = createContext({
  username: "",
  userId: "",
  auth: false,
  role: "",
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "",
    userId: "",
    auth: false,
    role: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const token_decode = decodeToken(token);
      const {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": username,
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role,
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
          userId,
      } = token_decode;
      setUser((user) => ({
        username: username,
        role: role,
        auth: true,
        userId: userId,
      }));
    }
  }, []);
  const decodeToken = (token) => {
    return jwtDecode(token);
  };
  const loginContext = (token) => {
    const token_decode = decodeToken(token);
    const {
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": username,
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role,
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
        userId,
    } = token_decode;
    setUser((user) => ({
      username: username,
      role: role,
      auth: true,
      userId: userId,
    }));
    localStorage.setItem("token", token);
  };
  const userAuthen = async (username, pwd) => {
    try {
      const response = await fetch("https://localhost:7112/api/Authen/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: pwd,
        }),
      });
      return response;
    } catch (error) {
      toast.error(`${error}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser((user) => ({
      username: "",
      role: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, logout, userAuthen, loginContext }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
