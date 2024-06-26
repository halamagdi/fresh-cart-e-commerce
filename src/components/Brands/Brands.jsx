import React, { useEffect, useState } from "react";
import style from "./Brands.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
export default function Brands() {
  const [brands, setBrands] = useState(null);
  async function getBrands() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/brands`,
        method: "GET",
      };
      let { data } = await axios.request(options);
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      {brands ? (
        <div className="grid grid-cols-12 gap-4 mx-auto w-10/12">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 hover:shadow-[1px_1px_10px_#4fa74f]  transition-all duration-300 rounded-lg overflow-hidden "
            >
              <div>
                <Link>
                  <img
                    src={brand.image}
                    className="max-w-full h-auto object-cover"
                    alt=""
                  />
                </Link>
              </div>
              <div className="content p-3 ">
                <h2 className="text-2xl font-semibold text-green-600 text-center line-clamp-1">
                  {brand.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
