import React, { createContext, useState } from "react";
import { useEffect } from "react";

// import all_products from "../components/assets/all_product";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_products, setAll_products] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/allproducts").then((response) =>
      response.json().then((data) => setAll_products(data))
    );
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  const addToCart = async (itemId) => {
    // update UI immediately
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem("auth-token")) {
      await fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    // send request to backend with token
    await fetch("http://localhost:4000/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"), // 🔑 token goes here
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
    if (localStorage.getItem("auth-token")) {
      await fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    // send request to backend with token
    await fetch("http://localhost:4000/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"), // 🔑 token goes here
      },
      body: JSON.stringify({ itemId }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
