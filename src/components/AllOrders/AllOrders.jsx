import React, { useContext, useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import { userContext } from "../../Context/UserContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../Loading/Loading";
export default function AllOrders() {
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);
  const [orders, setOrders] = useState(null);
  async function getUserOrders() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserOrders();
  }, []);
  return (
    <>
      {!orders ? (
        <Loading />
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="orders border border-gray-400 rounded p-4 mt-4"
          >
            <h2 className="font-bold mb-3 text-xl">Total Order Price : {order.totalOrderPrice}</h2>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-400">Order ID</h2>
                <h3 className="font-bold">{order.id}</h3>
              </div>
              <div>
                {order.isDelivered ? (
                  <span className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 inline-block mr-3 ">
                    Delivered
                  </span>
                ) : (
                  <span className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 inline-block mr-3 ">
                    Out For Delivery
                  </span>
                )}
                {order.isPaid ? (
                  <span className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 inline-block  ">
                    Paid
                  </span>
                ) : (
                  <span className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 inline-block  ">
                    Unpaid
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 mt-5">
              {order.cartItems.map((product) => (
                <div key={product._id} className="product border border-gray-300 rounded-md p-2 col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 mr-3">
                  <img
                    src={product.product.imageCover}
                    className="w-full "
                    alt=""
                  />
                  <h3 className="font-semibold my-2">
                    {product.product.title}
                  </h3>
                  <span>{product.price} EGP</span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
