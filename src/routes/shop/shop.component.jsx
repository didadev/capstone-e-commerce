import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/categories.actions";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../Category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path="/:catId" element={<Category />} />
    </Routes>
  );
};

export default Shop;
