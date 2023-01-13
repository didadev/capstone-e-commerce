import { createContext, useState, useEffect, useReducer } from "react";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase";

import PRODUCTS from "../shop-data.json";
import SHOP_DATA from "../SHOP_DATA.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

const CATEGORIES_TYPE = {
  SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP",
};

const INITIAL_STATE = {
  categoriesMap: {},
};
const categoriesReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_TYPE.SET_CATEGORIES:
      return { ...state, categoriesMap: payload };
    default:
      return state;
  }
};
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // const [categoriesMap, dispatch] = useReducer(
  //   categoriesReducer,
  //   INITIAL_STATE
  // );
  const value = { categoriesMap };

  /// this is only for populating firestore database with data.
  /// we needed to execute this only once. normally its managed on backend, but since we are only working on the frontend. we made it like that.
  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();

      // dispatch({
      //   type: CATEGORIES_TYPE.SET_CATEGORIES_MAP,
      //   payload: categoriesMap,
      // });

      setCategoriesMap(categoriesMap);
    };
    try {
      getCategories();
    } catch (err) {
      console.log("Erro while fetching data: ", err.message);
    }
  }, []);

  useEffect(() => {
    //addCollectionAndDocuments("categories", SHOP_DATA);
  });

  useEffect(() => {
    //setProducts(PRODUCTS);
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
