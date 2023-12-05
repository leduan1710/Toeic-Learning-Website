import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

function UserLayout({children}) {
  const { user } = useContext(UserContext);
  if(user.role==="" || user.role==="Student" || user.role==="VipStudent"){
    
    return <div className="user-layout">{children}</div>;
  }
}

export default UserLayout;
