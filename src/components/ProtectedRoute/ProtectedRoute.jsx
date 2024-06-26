import React, { useContext, useEffect, useState } from "react";
import style from "./ProtectedRoute.module.css";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
export default function ProtectedRoute({ children }) {
  const { token } = useContext(userContext);

  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}
