import { createContext, useContext, useState } from "react";
import { userContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(null);

export default function CartProvider({ children }) {
  const { token } = useContext(userContext);
  const [cartInfo, setCartInfo] = useState(null);

  async function getCartInfo() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
    } catch (error) {
      if (error.response.data.statusMsg === "fail") {
        setCartInfo([]);
        console.log(error);
      }
    }
  }

  async function addToCart({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };
      let { data } = await axios.request(options);
      setCartInfo(data);
      toast.success("Successfully Added To Cart ✅");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct({ id }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Successfully Removed From Cart ✅");

      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductCount({ id, count }) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      let { data } = await axios.request(options);
      toast.success("Successfully Updated ✅");
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCart() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/cart`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "success") {
        setCartInfo([]);
        toast.success("Successfully Removed the Cart ✅");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCartInfo,
        cartInfo,
        deleteProduct,
        updateProductCount,
        clearCart,
        setCartInfo,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
