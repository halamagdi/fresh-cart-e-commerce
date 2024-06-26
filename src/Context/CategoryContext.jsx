import axios from "axios";
import { createContext, useState } from "react";

export const categoryContext = createContext(null);

export default function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(null);
  async function getCategories() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <categoryContext.Provider
      value={{ categories, setCategories, getCategories }}
    >
      {children}
    </categoryContext.Provider>
  );
}
