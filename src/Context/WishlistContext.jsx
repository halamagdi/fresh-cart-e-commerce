import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export const wishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
  const { token } = useContext(userContext);
  const [wishlist, setWishlist] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  async function getUserWishlist() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function addToWishlist({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Successfully Added To Wishlist ✅");
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Successfully Removed From Wishlist ✅");

      if (data.data == []) {
        setWishlist([]);
      } else {
        setWishlist(data);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <wishlistContext.Provider
      value={{
        addToWishlist,
        removeFromWishlist,
        getUserWishlist,
        wishlist,
        isChanged,
        setIsChanged,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
