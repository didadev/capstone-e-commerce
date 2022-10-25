import { useContext, useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories-context";
import ProductCard from "../../components/product-card/product-card.component";

import "./category.styles.scss";

const Category = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  const { catId } = useParams();

  const [products, setProducts] = useState(categoriesMap[catId]);

  useEffect(() => {
    setProducts(categoriesMap[catId]);
  }, [catId, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{catId.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </Fragment>
  );
};

export default Category;
