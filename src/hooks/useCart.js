import AppContext from "../components/context";
import React from "react";

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return {
        cartItems,
        totalPrice,
        setCartItems
    }
}