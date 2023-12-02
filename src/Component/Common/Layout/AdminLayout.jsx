import React, { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

function AdminLayout({ children }) {
  const { user } = useContext(UserContext);
  if (user.role === "Admin") {
    return <div className="admin-layout">{children}</div>;
  }
}

export default AdminLayout;
