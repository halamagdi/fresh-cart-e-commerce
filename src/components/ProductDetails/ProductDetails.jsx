import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";
import { cartContext } from "../../Context/CartContext";
import ReactImageGallery from "react-image-gallery";
export default function ProductDetails() {
  let { id } = useParams();
  const [details, setDetails] = useState(null);
  const { addToCart } = useContext(cartContext);
  async function productDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetails(data.data);
  }
  useEffect(() => {
    productDetails();
  }, []);
  const imageItems = details?.images.map((imageURL) => {
    return {
      original: imageURL,
      thumbnail: imageURL,
    };
  });
  return (
    <>
      {details ? (
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <ReactImageGallery items={imageItems} showPlayButton={false} showNav={false}/>
          </div>
          <div className="col-span-8">
            <h2 className="text-2xl font-bold">{details.title}</h2>
            <h3 className="text-green-600 font-semibold ">
              {details.category.name}
            </h3>
            <p className="my-3">{details.description}</p>
            <div className="flex justify-between items-center">
              <span>{details.price} EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
                {details.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => {
                addToCart({ id: details.id });
              }}
              className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md mt-4 capitalize"
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
