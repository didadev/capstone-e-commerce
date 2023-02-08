import { CART_ACTION_TYPES } from "./cart.types";

import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (isOpen) =>
  createAction(CART_ACTION_TYPES.TOGGLE_CART, isOpen);

const updateCartItemsReducer = (newCartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART, newCartItems);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return updateCartItemsReducer(newCartItems);
};

export const removeItemFromCheckout = (cartItems, cartItemToRemove) => {
  const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
  return updateCartItemsReducer(newCartItems);
};

export const clearItemFromCheckout = (cartItems, cartItemToClear) => {
  const newCartItems = clearItemFromCart(cartItems, cartItemToClear);
  return updateCartItemsReducer(newCartItems);
};
