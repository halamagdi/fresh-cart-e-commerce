import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function Login() {
  let { token, setToken } = useContext(userContext);
  let navigate = useNavigate(); //programatic routing

  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);
  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),

    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,10}/,
        "Password must start with Uppercase , have at least 3 characters and at most 10 characters"
      )
      .required("Password is required"),
  });

  function onSubmit(initialValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, initialValues)
      .then((response) => {
        setIsLoading(false);
        if (response.data.message === "success") {
          toast.success("Successfully Logged In!");
          localStorage.setItem("userToken", response.data.token);
          setToken(response.data.token);
          navigate("/");
        }
      })
      .catch((response) => {
        setIsLoading(false);
        setapiError(response?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className="lg:max-w-3xl mx-auto py-6 max-w-md">
        {apiError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
            role="alert"
          >
            <span className="font-medium">{apiError}</span>
          </div>
        )}

        <h2 className="py-3 text-bold text-2xl text-slate-900 mb-3">
          Login Now :
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Your email :
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
              placeholder="name@flowbite.com"
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Your password :
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
            />
          </div>
          {formik.errors.password && formik.touched.password && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}

          <div className="lg:flex items-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mr-3"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
              ) : (
                "Login"
              )}
            </button>

            <span className="font-semibold mt-2 lg:mt-0">
              <Link to={"/auth/forget-password"} className="ml-4">
                forget your password ?
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
