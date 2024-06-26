import React, { useEffect, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
export default function Register() {
  let navigate = useNavigate(); //programatic routing

  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name minimum length 3 characters")
      .max(10, "Name maximum length 10 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone must be egyption number")
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{3,10}/,
        "Password must start with Uppercase , have at least 3 characters and at most 10 characters"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and RePassword must be the same")
      .required("RePassword is required"),
  });

  function onSubmit(initialValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, initialValues)
      .then((response) => {
        setIsLoading(false);
        if (response.data.message === "success") {
          toast.success("Successfully created!");
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
          // localStorage.setItem("userToken" , response.data.token)
        }
      })
      .catch((response) => {
        setIsLoading(false);
        setapiError(response?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
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
          Register Now :
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Your Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 "
            />
          </div>
          {formik.errors.name && formik.touched.name && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          )}

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
          <div className="mb-5">
            <label
              htmlFor="rePassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Your rePassword :
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
            />
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter Your phone :
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5  "
            />
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
