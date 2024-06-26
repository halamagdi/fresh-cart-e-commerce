import React, { useContext, useEffect, useState } from "react";
import style from "./Checkout.module.css";
import { useFormik } from "formik";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function Checkout() {
  const { token } = useContext(userContext);
  const { cartInfo, setCartInfo } = useContext(cartContext);
  const [orderType, setOrderType] = useState(null);
  const navigate = useNavigate();
  async function createCashOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Successfully Checkedout ✅");
      setCartInfo([]);
      setTimeout(() => {
        navigate("/allorders");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  async function createOnlineOrder(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.status === "success") {
        toast.success("Successfully Checkedout ✅");

        window.location.href = data.session.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: (values) => {
      if (orderType === "online") {
        createOnlineOrder(values);
      } else {
        createCashOrder(values);
      }
    },
  });

  useEffect(() => {}, []);
  return (
    <>
      <h2 className="text-2xl font-bold">Shipping Adress</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="City"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 my-3"
          name="shippingAddress.city"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
        />
        <input
          type="tel"
          placeholder="Phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          name="shippingAddress.phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
        />
        <textarea
          id=""
          placeholder="details"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-3"
          name="shippingAddress.details"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
        ></textarea>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="bg-black text-white rounded-md px-4 py-2 mt-4 w-fit mr-4"
        >
          Cash Payment
        </button>
        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700  mt-4 w-fit"
        >
          Online Payment
        </button>
      </form>
    </>
  );
}
