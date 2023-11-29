import React from "react";
import { useState, useEffect } from "react";
const UserContext = React.createContext({ username: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", auth: false });
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username: username, auth: true });
    }
  }, []);
  const loginContext = (username, token) => {
    setUser((user) => ({
      username: username,
      auth: true,
    }));
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };
  const userAuthen = async (username, pwd) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
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
      console.error("Đã có lỗi:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser((user) => ({
      username: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout, userAuthen }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };
