import React, { useEffect, useState } from "react";
import style from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function forgetPassword(values) {
    try {
      setIsLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        method: "POST",
        data: {
          email: values.email,
        },
      };
      let { data } = await axios.request(options);
      setIsLoading(false);
      console.log(data);
      if (data.statusMsg === "success") {
        navigate("/auth/verify-code");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPassword,
  });
  useEffect(() => {}, []);
  return (
    <>
      <section className="w-10/12 mx-auto">
        <h1 className="font-bold text-2xl">
          please enter your verification code
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            className="w-full border border-slate-400 rounded-lg p-3 my-5"
          />

          <button
            type="submit"
            className="w-fit bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-lg"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </section>
    </>
  );
}
