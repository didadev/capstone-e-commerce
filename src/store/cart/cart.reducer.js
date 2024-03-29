import { CART_ACTION_TYPES } from "./cart.types";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  //itemCount: 0,
  //cartTotal: 0,
};
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART:
      return {
        ...state,
        cartItems: payload,
      };
    default:
      return state;
  }
};
