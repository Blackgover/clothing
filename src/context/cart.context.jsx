import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productAdd) => {

    // find if cartItems contains productAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productAdd.id);

    // if found, increment quantity
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    // return new array with modified cartItems/ new cart item
    return[...cartItems, { ...productAdd, quantity:1}];
}

const removeCartItem = (cartItems, cartItemRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemRemove.id
    );

    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemRemove.id);
    }

    // return back cartItems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price , 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productAdd) => {
        setCartItems(addCartItem(cartItems, productAdd))
    }

    const removeItemToCart = (cartItemRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemRemove))
    }

    const clearItemToCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount,
        removeItemToCart,
        clearItemToCart,
        cartTotal,
    };

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}