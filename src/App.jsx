// import { useRef, useState, useCallback, useEffect, createContext } from "react";
import Meals from "./components/Meals";
import Header from "./components/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {

  return (
    <>
      <CartContextProvider>
        <UserProgressContextProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </UserProgressContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
