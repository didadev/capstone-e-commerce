import { createContext, useState, useEffect, useReducer } from "react";
import CartItem from "../components/cart-item/cart-item.component";
import { CartItems } from "../components/cart-dropdown/cart-dropdown.styles";

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

const CART_ACTION_TYPES = {
  TOGGLE_CART: "TOGGLE_CART",
  SET_CART: "SET_CART",
};
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  itemCount: 0,
  cartTotal: 0,
};
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART:
      return { ...state, isCartOpen: payload };
    case CART_ACTION_TYPES.SET_CART:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
    //throw new Error(`Unhandled ${type} with CartReducer`);
  }
};
export const CartProvider = ({ children }) => {
  //const [isCartOpen, setIsCartOpen] = useState(false);
  //const [cartItems, setCartItems] = useState([]);
  //const [itemCount, setItemCount] = useState(0);
  //const [cartTotal, setCartTotal] = useState(0);

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, itemCount, cartTotal } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newItemCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch({
      type: CART_ACTION_TYPES.SET_CART,
      payload: {
        cartItems: newCartItems,
        itemCount: newItemCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const setIsCartOpen = (isOpen) => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART, payload: isOpen });
  };

  // const getItemCount = () =>
  //   dispatch({ type: CART_ACTION_TYPES.SET_ITEM_COUNT });
  //setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);

    //setCartItems(addCartItem(cartItems, productToAdd));
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

  const removeItemFromCheckout = (cartItemToRemove) => {
    const newCartItems = removeItemFromCart(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  //setCartItems(removeItemFromCart(cartItems, cartItemToRemove));

  const clearItemFromCheckout = (cartItemToClear) => {
    const newCartItems = clearItemFromCart(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  // setCartItems(clearItemFromCart(cartItems, cartItemToClear));

  // const getCartTotal = () =>
  //   dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL });
  // setCartTotal(
  //   cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
  // );

  // useEffect(() => {
  //   getItemCount();
  // }, [cartItems]);

  // useEffect(() => {
  //   getCartTotal();
  // }, [cartItems]);

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

// import { createContext, useState, useEffect, useReducer } from "react";
// import CartItem from "../components/cart-item/cart-item.component";
// import { CartItems } from "../components/cart-dropdown/cart-dropdown.styles";

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   itemCount: 0,
//   cartTotal: 0,
//   removeItemFromCheckout: () => {},
//   clearItemFromCheckout: () => {},
// });

// const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );
//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];

//   // const index = cartItems.findIndex(
//   //   (cartItem) => cartItem.id === productToAdd.id
//   // );

//   // if (index === -1) {
//   //   setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
//   // } else {
//   //   const updatedItem = {
//   //     ...cartItems[index],
//   //     quantity: (cartItems[index].quantity = cartItems[index].quantity + 1),
//   //   };
//   //   cartItems[index] = updatedItem;
//   //   setCartItems([...cartItems]);
//   //}
// };

// const removeItemFromCart = (cartItems, cartItemToRemove) => {
//   if (cartItemToRemove.quantity === 1)
//     return clearItemFromCart(cartItems, cartItemToRemove);
//   return cartItems.map((cartItem) => {
//     if (cartItem.id === cartItemToRemove.id)
//       return { ...cartItem, quantity: cartItem.quantity - 1 };
//     return cartItem;
//   });
// };

// const clearItemFromCart = (cartItems, cartItemToClear) =>
//   cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// const CART_ACTION_TYPES = {
//   TOGGLE_CART: "TOGGLE_CART",
//   ADD_CART_TO_ITEM: "ADD_CART_TO_ITEM",
//   REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
//   SET_ITEM_COUNT: "SET_ITEM_COUNT",
//   SET_CART_TOTAL: "SET_CART_TOTAL",
//   CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART",
// };
// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   itemCount: 0,
//   cartTotal: 0,
// };
// const cartReducer = (state, action) => {
//   const { type, payload } = action;
//   console.log(action);
//   switch (type) {
//     case CART_ACTION_TYPES.TOGGLE_CART:
//       return { ...state, isCartOpen: payload };
//     case CART_ACTION_TYPES.ADD_CART_TO_ITEM:
//       return { ...state, cartItems: payload };
//     case CART_ACTION_TYPES.SET_ITEM_COUNT:
//       return {
//         ...state,
//         itemCount: state.cartItems.reduce(
//           (total, item) => total + item.quantity,
//           0
//         ),
//       };
//     case CART_ACTION_TYPES.SET_CART_TOTAL:
//       console.log({
//         ...state,
//         cartTotal: state.cartItems.reduce(
//           (total, item) => total + item.quantity * item.price,
//           20
//         ),
//       });
//       return {
//         ...state,
//         cartTotal: state.cartItems.reduce(
//           (total, item) => total + item.quantity * item.price,
//           0
//         ),
//       };
//     case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
//       return {
//         ...state,
//         cartItems: removeItemFromCart(state.cartItems, payload),
//       };
//     case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
//       return {
//         ...state,
//         cartItems: clearItemFromCart(state.cartItems, payload),
//       };
//     default:
//       return state;
//   }
// };
// export const CartProvider = ({ children }) => {
//   //const [isCartOpen, setIsCartOpen] = useState(false);
//   //const [cartItems, setCartItems] = useState([]);
//   //const [itemCount, setItemCount] = useState(0);
//   //const [cartTotal, setCartTotal] = useState(0);

//   const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
//   const { isCartOpen, cartItems, itemCount, cartTotal } = state;

//   const updateCartItemsReducer = (CartItems) => {};

//   const setIsCartOpen = (isOpen) => {
//     dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART, payload: isOpen });
//   };

//   const getItemCount = () =>
//     dispatch({ type: CART_ACTION_TYPES.SET_ITEM_COUNT });
//   //setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));

//   const addItemToCart = (productToAdd) => {
//     //setCartItems(addCartItem(cartItems, productToAdd));
//     dispatch({
//       type: CART_ACTION_TYPES.ADD_CART_TO_ITEM,
//       payload: addCartItem(cartItems, productToAdd),
//     });
//     //addCartItem(cartItems, productToAdd);
//   };

//   // const addItemFromCheckout = (selectedCartItem) => {
//   //   //const item = cartItems.find(cartItem => cartItem.id === setCartItems.id);
//   //   setCartItems(
//   //     cartItems.map((cartItem) => {
//   //       if (cartItem.id === selectedCartItem.id)
//   //         return { ...cartItem, quantity: cartItem.quantity + 1 };
//   //       return cartItem;
//   //     })
//   //   );
//   // };
//   const removeItemFromCheckout = (cartItemToRemove) =>
//     dispatch({
//       type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
//       payload: cartItemToRemove,
//     });
//   //setCartItems(removeItemFromCart(cartItems, cartItemToRemove));

//   const clearItemFromCheckout = (cartItemToClear) =>
//     dispatch({
//       type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
//       payload: cartItemToClear,
//     });
//   // setCartItems(clearItemFromCart(cartItems, cartItemToClear));

//   const getCartTotal = () =>
//     dispatch({ type: CART_ACTION_TYPES.SET_CART_TOTAL });
//   // setCartTotal(
//   //   cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
//   // );

//   useEffect(() => {
//     getItemCount();
//   }, [cartItems]);

//   useEffect(() => {
//     getCartTotal();
//   }, [cartItems]);

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     cartItems,
//     cartTotal,
//     addItemToCart,
//     itemCount,

//     removeItemFromCheckout,
//     clearItemFromCheckout,
//   };
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
