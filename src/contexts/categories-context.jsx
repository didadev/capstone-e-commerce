import { createContext, useState, useEffect } from "react";
import {
  addCollectionAndDocuments,
  getCategoriesAndDocuments,
} from "../utils/firebase/firebase";

import PRODUCTS from "../shop-data.json";
import SHOP_DATA from "../SHOP_DATA.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  /// this is only for populating firestore database with data.
  /// we needed to execute this only once. normally its managed on backend, but since we are only working on the frontend. we made it like that.
  useEffect(() => {
    const getCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
    };
    getCategories();
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
