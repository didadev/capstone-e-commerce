import { createContext, useState, useEffect } from "react";
import CartItem from "../components/cart-item/cart-item.component";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemCount: 0,
  cartTotal: 0,
  removeItemFromCheckout: () => {},
  clearItemFromCheckout: () => {},
});

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];

  // const index = cartItems.findIndex(
  //   (cartItem) => cartItem.id === productToAdd.id
  // );

  // if (index === -1) {
  //   setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
  // } else {
  //   const updatedItem = {
  //     ...cartItems[index],
  //     quantity: (cartItems[index].quantity = cartItems[index].quantity + 1),
  //   };
  //   cartItems[index] = updatedItem;
  //   setCartItems([...cartItems]);
  //}
};

const removeItemFromCart = (cartItems, cartItemToRemove) => {
  if (cartItemToRemove.quantity === 1)
    return clearItemFromCart(cartItems, cartItemToRemove);
  return cartItems.map((cartItem) => {
    if (cartItem.id === cartItemToRemove.id)
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    return cartItem;
  });
};

const clearItemFromCart = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const getItemCount = () =>
    setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
    //addCartItem(cartItems, productToAdd);
  };

  // const addItemFromCheckout = (selectedCartItem) => {
  //   //const item = cartItems.find(cartItem => cartItem.id === setCartItems.id);
  //   setCartItems(
  //     cartItems.map((cartItem) => {
  //       if (cartItem.id === selectedCartItem.id)
  //         return { ...cartItem, quantity: cartItem.quantity + 1 };
  //       return cartItem;
  //     })
  //   );
  // };
  const removeItemFromCheckout = (cartItemToRemove) =>
    setCartItems(removeItemFromCart(cartItems, cartItemToRemove));

  const clearItemFromCheckout = (cartItemToClear) =>
    setCartItems(clearItemFromCart(cartItems, cartItemToClear));

  const getCartTotal = () =>
    setCartTotal(
      cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
    );

  useEffect(() => {
    getItemCount();
  }, [cartItems]);

  useEffect(() => {
    getCartTotal();
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cartTotal,
    addItemToCart,
    itemCount,

    removeItemFromCheckout,
    clearItemFromCheckout,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
