import React, { useEffect, useState } from "react";
import style from "./NotFound.module.css";
import image from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-96">
        <img src={image} className="w-full h-full" alt="" />
      </div>
    </>
  );
}
