import React from "react";
import Register from "../components/Auth/Register";
import { useLocation } from "react-router-dom";
import Login from "../components/Auth/Login";
function AuthPage({}) {
  const location = useLocation();
  console.log(location.pathname);
  return location.pathname == "/auth" ? <Register /> : <Login />;
}

export default AuthPage;
