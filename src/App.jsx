import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import UserContextProvider from "./Context/UserContext";
import NotFound from "./components/NotFound/NotFound";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import CartProvider from "./Context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import CategoryProvider from "./Context/CategoryContext";
import ProductProvider from "./Context/ProductContext";
import Wishlist from "./components/Wishlist/Wishlist";
import WishlistProvider from "./Context/WishlistContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyCode from "./components/verifyCode/verifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },

        { path: "products", element: <Products /> },
        { path: "brands", element: <Brands /> },
        { path: "/categories", element: <Categories /> },
        { path: "/product/:id", element: <ProductDetails /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/allorders", element: <AllOrders /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-code", element: <VerifyCode /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <UserContextProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <CategoryProvider>
              <RouterProvider router={router}></RouterProvider>;
              <Toaster />
            </CategoryProvider>
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </UserContextProvider>
  );
}

export default App;
