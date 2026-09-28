function CategoryFilter({
  activeCategory,
  onCategoryChange,
}) {
  const categories = [
    {
      id: "popular",
      label: "Popular",
    },
    {
      id: "top-rated",
      label: "Top Rated",
    },
    {
      id: "now-playing",
      label: "Now Playing",
    },
    {
      id: "upcoming",
      label: "Upcoming",
    },
  ];

  return (
    <div className="category-container">
      {categories.map((category) => (
        <button
          key={category.id}
          className={
            activeCategory === category.id
              ? "active"
              : ""
          }
          onClick={() =>
            onCategoryChange(category.id)
          }
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;