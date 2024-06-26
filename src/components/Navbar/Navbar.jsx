import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate();
  let { token, setToken, logout } = useContext(userContext);
  let { getCartInfo, cartInfo } = useContext(cartContext);
  let { getUserWishlist } = useContext(wishlistContext);

  useEffect(() => {
    if (token) {
      getCartInfo();
    }
  }, []);
  return (
    <>
      <nav className="bg-gray-100 py-2 fixed-top left-0 right-0 relative ">
        <div className="w-10/12 mx-auto flex  lg:flex-row justify-between py-2 items-center text-center ">
          <div className="flex lg:flex-row">
            {token !== null ? (
              <>
                <NavLink to="">
                  <img src={logo} alt="fresh cart logo" className="py-2" />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/auth/login">
                  <img src={logo} alt="fresh cart logo" className="py-2" />
                </NavLink>
              </>
            )}
            <div onClick={() => setOpen(!open)} className="text-3xl absolute right-3 top-6 cursor-pointer md:hidden ">
              <i
                className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
              ></i>
            </div>
            {token ? (
              <ul className={`lg:flex lg:items-center lg:pb-0 pb-12 bg-white md:bg-transparent items-center absolute lg:static lg:z-auto z-10 left-0  w-full lg:w-auto lg:pl-0 transition-all duration-500 ease-in ${open ? 'top-20' : '-top-96 -z-30 '}`}>
                <>
                  <li className="py-2">
                    <NavLink className="text-lg text-slate-900 mx-2 " to="">
                      Home
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2 "
                      to="products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2 "
                      to="/categories"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2 "
                      to="/brands"
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2 "
                      to="/wishlist"
                    >
                      Wishlist
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2 "
                      to="/allorders"
                    >
                      Orders
                    </NavLink>
                  </li>
                </>
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="flex lg:flex-row items-center">
            {token ? (
              <Link to={"/cart"} className="mr-3 relative">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <span className="bg-green-600 text-white w-4 h-4 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2  flex items-center justify-center p-2 text-xs">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    cartInfo.numOfCartItems || 0
                  )}
                </span>
              </Link>
            ) : (
              ""
            )}

            <ul className="flex lg:flex-row ">

              {!token ? (
                <>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2  "
                      to="/auth/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="py-2">
                    <NavLink
                      className="text-lg text-slate-900 mx-2  "
                      to="/auth/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="py-2" onClick={logout}>
                    <span className="text-lg text-slate-900 mx-2 cursor-pointer">
                      Logout
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
