import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function verifyCode(values) {
    try {
      setIsLoading(true);
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        method: "POST",
        data: {
          resetCode: values.resetCode,
        },
      };
      let { data } = await axios.request(options);
      setIsLoading(false);
      console.log(data);
      if (data.status === "Success") {
        toast.success("Successfully Verified ✅");
        setTimeout(() => {
          navigate("/auth/reset-password");
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: verifyCode,
  });
  useEffect(() => {}, []);
  return (
    <>
      <section className="w-10/12 mx-auto">
        <h1 className="font-bold text-2xl">reset your account password</h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            placeholder="Code"
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
