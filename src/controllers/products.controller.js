import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updatePartialProduct = async (req, res, next) => {
  try {
    const allowedUpdates = ["name", "price", "description", "stock_quantity"];
    const updates = {};

    for (let key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },  // ensures only these fields are modified
      { new: true, runValidators: true } // runValidators = validate schema rules
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};


export const getLowStockProducts = async (req, res, next) => {
  try {
    const threshold = Number(req.query.threshold ?? 10);
    const products = await Product.find({ stock_quantity: { $lt: threshold } });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const increaseStock = async (req, res, next) => {
  try {
    const { addOnStockQuantity } = req.body;
    if (!addOnStockQuantity || addOnStockQuantity <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock_quantity: addOnStockQuantity } },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const decreaseStock = async (req, res, next) => {
  try {
    const { reduceStockQuantity } = req.body;
    if (!reduceStockQuantity || reduceStockQuantity <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.stock_quantity < reduceStockQuantity) {
      return res.status(422).json({ message: "Insufficient stock available" });
    }

    product.stock_quantity -= reduceStockQuantity;
    await product.save();

    res.json(product);
  } catch (err) {
    next(err);
  }
};



// export const adjustStock = async (req, res, next) => {
//   try {
//     const { stock_quantity } = req.body;
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       { stock_quantity },
//       { new: true }
//     );
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     next(err);
//   }
// };
