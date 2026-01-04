import Product from "./products.model.js";
import mongoose from "mongoose";
import Club from "../club/club.model.js";
import Jersey from "../jersey/jersey.model.js";


const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getClubs = async ({ page, limit, league, search }) => {
  const query = {};

  if (league) query.league = league;

  if (search) {
    const r = new RegExp(escapeRegex(search), "i");
    // search by name / league (optional)
    query.$or = [{ name: r }, { league: r }];
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Club.find(query).sort({ name: 1 }).skip(skip).limit(limit).lean(),
    Club.countDocuments(query),
  ]);

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getJerseys = async ({
  page,
  limit,
  league,
  type,
  clubId,
  clubName,
  minPrice,
  maxPrice,
  search,
}) => {
  const query = {};

  if (league) query.league = league;
  if (type) query.type = type;

  if (clubId) {
    if (!mongoose.Types.ObjectId.isValid(clubId)) {
      throw new Error("Invalid clubId");
    }
    query.clubId = new mongoose.Types.ObjectId(clubId);
  }

  if (clubName) query.clubName = clubName;

  // price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    query.price = {};
    if (minPrice !== undefined) query.price.$gte = minPrice;
    if (maxPrice !== undefined) query.price.$lte = maxPrice;
  }

  // "search" against clubName / league / type (you can add more fields later)
  if (search) {
    const r = new RegExp(escapeRegex(search), "i");
    query.$or = [{ clubName: r }, { league: r }, { type: r }];
  }

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    Jersey.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Jersey.countDocuments(query),
  ]);

  return {
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};





// (you already have this) import Club from "../models/club.model.js";

export const getClubById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid club id");
  }
  

  const club = await Club.findById(id).lean();

  if (!club) {
    throw new Error("Club not found");
  }

  return club;
};





















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