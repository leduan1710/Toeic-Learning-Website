import React from "react";
import { useState, useEffect, createContext } from "react";
const UserContext = createContext({ username: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: "", auth: false });
  useEffect(() => {
    console.log("get user info")
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token && username) {
      setUser({ username: username, auth: true });
    }
  }, []);
  const loginContext = (username, token) => {
    
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
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
      } else {
        const data = await response.json();
        setUser((user) => ({
            username: username,
            auth: true,
          }));
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", username);
      }
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
