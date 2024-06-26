import React, { useContext, useEffect, useState } from "react";
import style from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
export default function ProductCard(props) {
  const { category, imageCover, title, price, ratingsAverage, id } =
    props.products;
  const { addToCart } = useContext(cartContext);
  const { removeFromWishlist, addToWishlist } = useContext(wishlistContext);

  const colorChange = (e) => {
    if (e.target.classList.contains("text-red-500")) {
      e.target.classList.replace("text-red-500", "text-black");
      removeFromWishlist({ id });
    } else {
      e.target.classList.add("text-red-500");
      addToWishlist({ id });
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  hover:shadow-[1px_1px_10px_#4fa74f]  transition-all duration-300 rounded-lg overflow-hidden group">
        <div>
          <Link to={`/product/${id}`}>
            <img
              src={imageCover}
              className="w-full h-full object-cover"
              alt=""
            />
          </Link>
        </div>
        <div className="content p-3 ">
          <h3 className="text-green-600">{category.name}</h3>
          <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
          <div className="flex justify-between items-center mt-4">
            <span>{price} EGP</span>
            <div className="flex gap-1 items-center">
              <i className="fa-solid fa-star text-yellow-500 "></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 overflow-hidden">
            <button
              className="bg-green-600 hover:bg-green-700 text-white w-40 py-2 rounded-md translate-y-full group-hover:translate-y-0 transition-all duration-300"
              onClick={() => {
                addToCart({ id });
              }}
            >
              + Add
            </button>
            <button
              onClick={(e) => {
                colorChange(e);
              }}
            >
              <i className="fa-solid fa-heart fa-xl cursor-pointer"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
