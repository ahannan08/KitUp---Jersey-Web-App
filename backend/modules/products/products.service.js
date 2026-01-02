import Product from "./product.model.js";

export const createProduct = async (productData, userId) => {
  const product = await Product.create({
    ...productData,
    createdBy: userId,
  });
  return product;
};

export const getAllProducts = async (filters = {}, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const query = { isActive: true };

  if (filters.team) query.team = filters.team;
  if (filters.type) query.type = filters.type;
  if (filters.league) query.league = filters.league;
  if (filters.minPrice || filters.maxPrice) {
    query.price = {};
    if (filters.minPrice) query.price.$gte = filters.minPrice;
    if (filters.maxPrice) query.price.$lte = filters.maxPrice;
  }
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  return {
    products,
    totalProducts: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getProductById = async (id) => {
  const product = await Product.findById(id).populate("createdBy", "name email");
  if (!product) throw new Error("Product not found");
  return product;
};

export const getProductsByTeam = async (team, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const products = await Product.find({ team, isActive: true })
    .skip(skip)
    .limit(limit)
    .sort({ type: 1 });

  const total = await Product.countDocuments({ team, isActive: true });

  return {
    products,
    totalProducts: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const updateProduct = async (id, updates) => {
  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new Error("Product not found");
  return product;
};

export const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
  return product;
};

export const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  product.stock -= quantity;
  await product.save();
  return product;
};

export const restoreStock = async (id, quantity) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  product.stock += quantity;
  await product.save();
  return product;
};

export const searchProducts = async (searchTerm, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const products = await Product.find(
    { $text: { $search: searchTerm }, isActive: true },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .skip(skip)
    .limit(limit);

  const total = await Product.countDocuments({
    $text: { $search: searchTerm },
    isActive: true,
  });

  return {
    products,
    totalProducts: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const updateRating = async (id, newRating, increment = true) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  if (increment) {
    product.totalReviews += 1;
    product.rating = (product.rating * (product.totalReviews - 1) + newRating) / product.totalReviews;
  }

  await product.save();
  return product;
};