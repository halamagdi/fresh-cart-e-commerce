import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import Loading from "../Loading/Loading";
import HomeSlider from "../HomeSlider/HomeSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { productContext } from "../../Context/ProductContext";

export default function Home() {
  const { products, getProducts } = useContext(productContext);
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <HomeSlider />
      <CategorySlider />

      {products ? (
        <div className="grid grid-cols-12 gap-4 mx-auto w-10/12">
          {products.map((product) => (
            <ProductCard products={product} key={product._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
