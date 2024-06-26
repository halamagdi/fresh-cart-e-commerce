import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
export default function Cart() {
  let { cartInfo, deleteProduct, updateProductCount, clearCart, getCartInfo } =
    useContext(cartContext);

  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="bg-slate-100 p-5">
          <h2 className="text-2xl font-bold mb-2">
            <span>Shop Cart</span>
            <i className="fa-solid fa-cart-shopping ml-2"></i>
          </h2>
          {cartInfo.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16">
              <h3 className="text-lg">there are not items yet.</h3>
              <Link
                to={"/products"}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md mt-2 text-sm capitalize"
              >
                add your first product to cart
              </Link>
            </div>
          ) : (
            <>
              {cartInfo.data.products.map((product) => (
                <div
                  key={product._id}
                  className="product grid grid-cols-12 gap-5 mt-4"
                >
                  <div className="col-span-1">
                    <img
                      src={product.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="col-span-11 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {product.product.title}
                      </h3>
                      <h4 className="text-green-600">
                        Price : {product.price} EGP
                      </h4>
                      <button
                        onClick={() => {
                          deleteProduct({ id: product.product.id });
                        }}
                        className="bg-red-500 text-white text-sm rounded-md mt-3 px-4 py-2 uppercase hover:bg-red-600"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i>Remove
                      </button>
                    </div>
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() => {
                          updateProductCount({
                            id: product.product.id,
                            count: product.count - 1,
                          });
                        }}
                        className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="text-lg font-bold">{product.count}</span>
                      <button
                        onClick={() => {
                          updateProductCount({
                            id: product.product.id,
                            count: product.count + 1,
                          });
                        }}
                        className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700"
                      >
                        <i className="fa-soid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 block ms-auto mt-4"
              >
                Clear Cart
              </button>
            </>
          )}
        </section>
      )}
      <Link to={"/checkout"} className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700 block ms-auto mt-4 w-fit">
        Next Step
      </Link>
    </>
  );
}
