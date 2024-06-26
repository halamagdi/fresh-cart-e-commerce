import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../Context/WishlistContext";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContext";
export default function Wishlist() {
  let {
    wishlist,
    removeFromWishlist,
    getUserWishlist,
    colorChange,
    setColorChange,
  } = useContext(wishlistContext);
  const { addToCart } = useContext(cartContext);

  useEffect(() => {
    getUserWishlist();
  }, []);
  return (
    <>
      {wishlist === null ? (
        <Loading />
      ) : (
        <section className="bg-slate-100 p-5">
          <h2 className="text-2xl font-bold mb-2">
            <span>My Wishlist</span>
          </h2>
          {wishlist.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16">
              <h3 className="text-lg">there are not items yet.</h3>
              <Link
                to={"/products"}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md mt-2 text-sm capitalize"
              >
                add your first product to Wishlist
              </Link>
            </div>
          ) : (
            <>
              {wishlist.data.map((product) => (
                <div
                  key={product._id}
                  className="product grid grid-cols-12 gap-5 mt-6"
                >
                  <div className="col-span-2">
                    <img src={product.imageCover} className="w-full" alt="" />
                  </div>
                  <div className="col-span-10 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <h4 className="text-green-600">
                        Price : {product.price} EGP
                      </h4>
                      <button
                        onClick={() => {
                          removeFromWishlist({ id: product.id });
                        }}
                        className="bg-red-500 text-white text-sm rounded-md mt-3 px-4 py-2 uppercase hover:bg-red-600"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i>Remove
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        addToCart({ id: product._id });
                      }}
                      className="bg-green-500 text-white text-sm rounded-md mt-3 px-4 py-2 uppercase hover:bg-green-600"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      )}
    </>
  );
}
