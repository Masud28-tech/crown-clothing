import { createContext, useState, useEffect } from "react";

const addItemToCartHelper = (cartItems, itemToAdd) => {
    // find cartItems array contains 'itemToAdd' or not
    const isItemToAddExist = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

    // If contains then increment 'quantity' of item
    if (isItemToAddExist) {
        return cartItems.map((cartItem) =>
            cartItem.id === itemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // return 'cartItems' with newly added item having quantity = 1
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

const removeCartItemHelper = (cartItems, itemToRemove) => {
    // find itemToRemove from cartItems
    const existingItemToRemove = cartItems.find((cartItem) => cartItem.id === itemToRemove.id)

    // check if quantity of item is 1 or not if yes: then remove item from the cartItems array
    if (existingItemToRemove.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
    }

    // Otherwise decrease quantity of item by 1 and return cartItems array (modified)
    return cartItems.map((cartItem) =>
        cartItem.id === itemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );

}
// Clear all the instances of item from the cartItems array
const clearCartItemHelper = (cartItems, itemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    cartItemsCount: 0,
    cartTotal: 0,
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { }
});

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (itemToAdd) => {
        setCartItems(addItemToCartHelper(cartItems, itemToAdd));
    };

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItemHelper(cartItems, itemToRemove));
    }

    const clearItemFromCart = (itemToClear) => {
        setCartItems(clearCartItemHelper(cartItems, itemToClear));
    }


    // variable to track and show total items (count) in cart i.e 'cartItemsCount
    useEffect(() => {
        const totalItemsCount = cartItems.reduce((total, cartItem) =>
            total + cartItem.quantity, 0);

        setCartItemsCount(totalItemsCount);

    }, [cartItems]);

    // Calculate and update 'Total' price in checkout section by multiplying quantities with respective prices of items
    useEffect(() => {
        const totalPrice = cartItems.reduce((total, cartItem) =>
            total + cartItem.quantity * cartItem.price, 0);

        setCartTotal(totalPrice);
    }, [cartItems]);
    

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItemsCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value} > {children} </CartContext.Provider>
    );
}