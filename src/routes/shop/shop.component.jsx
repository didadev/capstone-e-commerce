import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";
import { setCategories } from "../../store/categories/categories.actions";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../Category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      //const categoriesMap = await getCategoriesAndDocuments();
      const categories = await getCategoriesAndDocuments();

      // dispatch({
      //   type: CATEGORIES_TYPE.SET_CATEGORIES_MAP,
      //   payload: categoriesMap,
      // });

      dispatch(setCategories(categories));
    };
    try {
      getCategories();
    } catch (err) {
      console.log("Erro while fetching data: ", err.message);
    }
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path="/:catId" element={<Category />} />
    </Routes>
  );
};

export default Shop;
