import Wishlist from "./wishlist.model.js";
import Product from "../products/product.model.js";

export const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate("products");

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }

  return wishlist;
};

export const addToWishlist = async (userId, productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [productId],
    });
  } else {
    // Check if product already in wishlist
    if (wishlist.products.includes(productId)) {
      throw new Error("Product already in wishlist");
    }

    wishlist.products.push(productId);
  }

  await wishlist.save();
  return wishlist.populate("products");
};

export const removeFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) throw new Error("Wishlist not found");

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId
  );

  await wishlist.save();
  return wishlist.populate("products");
};

export const clearWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) throw new Error("Wishlist not found");

  wishlist.products = [];
  await wishlist.save();
  return wishlist;
};

export const isInWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) return false;

  return wishlist.products.includes(productId);
};