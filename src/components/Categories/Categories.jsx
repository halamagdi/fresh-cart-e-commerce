import React, { useContext, useEffect, useState } from "react";
import style from "./Categories.module.css";
import { categoryContext } from "../../Context/CategoryContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
export default function Categories() {
  const { categories, getCategories } = useContext(categoryContext);
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {categories ? (
        <div className="grid grid-cols-12 gap-4 mx-auto w-10/12">
          {categories.map((category) => (
            <div
              key={category._id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  hover:shadow-[1px_1px_10px_#4fa74f]  transition-all duration-300 rounded-lg overflow-hidden "
            >
              <div>
                <Link>
                  <img
                    src={category.image}
                    className="w-full h-80 object-cover"
                    alt=""
                  />
                </Link>
              </div>
              <div className="content p-3 ">
                <h2 className="text-2xl font-semibold text-green-600 text-center line-clamp-1">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}


