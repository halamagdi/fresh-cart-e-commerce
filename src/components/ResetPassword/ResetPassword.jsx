import React, { useContext, useEffect, useState } from "react";
import style from "./ResetPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { userContext } from "../../Context/UserContext";
import toast from "react-hot-toast";
export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(userContext);
  async function resetPassword(values) {
    try {
      setIsLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        method: "PUT",
        data: {
          email: values.email,
          newPassword: values.newPassword,
        },
      };
      let { data } = await axios.request(options);
      setIsLoading(false);
      console.log(data);
      if (data.token) {
        toast.success("Successfully Reset The Password ✅");

        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
  });
  useEffect(() => {}, []);
  return (
    <>
      <section className="w-10/12 mx-auto">
        <h1 className="font-bold text-2xl">reset your account password</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            className="w-full border border-slate-400 rounded-lg p-3 mt-5"
          />

          <input
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="newPassword"
            className="w-full border border-slate-400 rounded-lg p-3 my-5"
          />

          <button
            type="submit"
            className="w-fit bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-lg"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </section>{" "}
    </>
  );
}
