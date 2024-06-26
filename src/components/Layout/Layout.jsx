import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  const [first, setfirst] = useState(0);
  useEffect(() => {}, []);
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 my-6">
        <Outlet></Outlet>
      </div>
    </>
  );
}
