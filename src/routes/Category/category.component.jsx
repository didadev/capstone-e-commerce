import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";
import Spinner from "../../components/Spinner/spinner.component";

const Category = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const { catId } = useParams();

  const [products, setProducts] = useState(categoriesMap[catId]);

  useEffect(() => {
    setProducts(categoriesMap[catId]);
  }, [catId, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{catId.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
