import axios from "axios";
import { createContext, useState } from "react";

export const productContext = createContext("");

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState(null);

    async function getProducts() {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setProducts(data.data);
    }
  return (
    <productContext.Provider value={{products, setProducts , getProducts}}>{children}</productContext.Provider>
  );
}
