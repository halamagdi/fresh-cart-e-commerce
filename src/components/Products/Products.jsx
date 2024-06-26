import React, { useContext, useEffect, useState } from "react";
import style from "./Products.module.css";
import { productContext } from "../../Context/ProductContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
export default function Products() {
  const { products, getProducts } = useContext(productContext);
  const { addToCart } = useContext(cartContext);
  const {
    addToWishlist,
    removeFromWishlist,
    isChanged,
    setIsChanged,
    getUserWishlist,
  } = useContext(wishlistContext);

  const redColor = (e) => {
    setIsChanged(true);
    if (!e.target.classList.contains("text-red-500")) {
      e.target.classList.add("text-red-500");
    }
  };
  const blackColor = (e) => {
    e.target.classList.replace("text-red-500", "text-black");
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {products ? (
        <div className="grid grid-cols-12 w-10/12 gap-4 mx-auto ">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  hover:shadow-[1px_1px_10px_#4fa74f]  transition-all duration-300 rounded-lg overflow-hidden group"
            >
              <div>
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.imageCover}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </Link>
              </div>
              <div className="content p-3 ">
                <h3 className="text-green-600">{product.category.name}</h3>
                <h2 className="text-lg font-semibold line-clamp-1">
                  {product.title}
                </h2>
                <div className="flex justify-between items-center mt-4">
                  <span>{product.price} EGP</span>
                  <div className="flex gap-1 items-center">
                    <i className="fa-solid fa-star text-yellow-500 "></i>
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 overflow-hidden">
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white w-40 py-2 rounded-md translate-y-full group-hover:translate-y-0 transition-all duration-300"
                    onClick={() => {
                      addToCart({ id: product._id });
                    }}
                  >
                    + Add
                  </button>
                  <button
                    onClick={(e) => {
                      if (!isChanged) {
                        addToWishlist({ id: product._id });
                        redColor(e);
                      } else {
                        removeFromWishlist({ id: product._id });
                        blackColor(e);
                      }
                      setIsChanged(!isChanged);
                    }}
                    className={`fa-solid fa-heart fa-xl cursor-pointer`}
                  ></button>
                </div>
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
