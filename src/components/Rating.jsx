function Rating({ rating }) {
  const value = Number(rating || 0);

  return (
    <span className="rating">
      ⭐ {value.toFixed(1)}
    </span>
  );
}

export default Rating;