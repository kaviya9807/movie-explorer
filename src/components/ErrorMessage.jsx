function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <h2>Something went wrong</h2>

      <p>
        {message || "Unable to load movies."}
      </p>
    </div>
  );
}

export default ErrorMessage;