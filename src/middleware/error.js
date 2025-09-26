const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(422).json({
      message: "Validation failed",
      errors: Object.keys(err.errors).map((field) => ({
        field,
        message: err.errors[field].message,
      })),
    });
  }
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  res.status(500).json({ message: "Internal Server Error" });
};

export default errorHandler;
