import React, { useContext, useEffect, useState } from "react";
import style from "./CategorySlider.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { categoryContext } from "../../Context/CategoryContext";
export default function CategorySlider() {
  const { categories , getCategories} = useContext(categoryContext);
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      {categories ? (
        <section className="w-10/12 mx-auto pb-8">
          <h2 className="font-semibold text-lg mb-3">
            Shop Popular Catergories
          </h2>
          <swiper-container loop={true} slides-per-view={6}>
            {categories.map((category) => (
              <swiper-slide key={category._id}>
                <Link to={`/category/${category._id}`}>
                  <img
                    src={category.image}
                    className="w-full h-72 object-cover"
                    alt=""
                  />
                  <h3 className="font-semibold">{category.name}</h3>
                </Link>
              </swiper-slide>
            ))}
          </swiper-container>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
