import "./category-item.styles.scss";

const CategoryItem = ({ category, large }) => {
  const { title, imageUrl } = category;
  return (
    <div className={`category-container ${large ? "large" : ""}`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
