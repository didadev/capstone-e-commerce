import CategoryItem from "../category-item/category-item.component";

import "./directory.styles.scss";

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category, i, arr) => {
        const large = i === arr.length - 1 || i === arr.length - 2;
        return (
          <CategoryItem key={category.id} category={category} large={large} />
        );
      })}
    </div>
  );
};

export default Directory;
