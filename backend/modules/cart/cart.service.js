import Cart from "./cart.model.js";
import Product from "../products/product.model.js";

const calculateCartTotals = (items) => {
  let totalPrice = 0;
  let totalItems = 0;

  items.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });

  return { totalPrice, totalItems };
};

export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  return cart;
};

export const addToCart = async (userId, productId, quantity, size) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  if (!product.availableSizes.includes(size)) {
    throw new Error("Size not available for this product");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [
        {
          product: productId,
          quantity,
          size,
          price: product.price,
        },
      ],
    });
  } else {
    // Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        size,
        price: product.price,
      });
    }
  }

  const { totalPrice, totalItems } = calculateCartTotals(cart.items);
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;

  await cart.save();
  return cart.populate("items.product");
};

export const updateCartItem = async (userId, productId, quantity, size) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (item) => item.product.toString() === productId && item.size === size
  );

  if (!item) throw new Error("Item not found in cart");

  const product = await Product.findById(productId);
  if (product.stock < quantity) {
    throw new Error("Insufficient stock");
  }

  item.quantity = quantity;

  const { totalPrice, totalItems } = calculateCartTotals(cart.items);
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;

  await cart.save();
  return cart.populate("items.product");
};

export const removeFromCart = async (userId, productId, size) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => !(item.product.toString() === productId && item.size === size)
  );

  const { totalPrice, totalItems } = calculateCartTotals(cart.items);
  cart.totalPrice = totalPrice;
  cart.totalItems = totalItems;

  await cart.save();
  return cart.populate("items.product");
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  cart.totalPrice = 0;
  cart.totalItems = 0;

  await cart.save();
  return cart;
};