import * as cartService from "./cart.service.js";

export const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user._id);
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    if (!productId || !quantity || !size) {
      return res.status(400).json({
        success: false,
        message: "Product ID, quantity, and size are required",
      });
    }

    const cart = await cartService.addToCart(
      req.user._id,
      productId,
      quantity,
      size
    );

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, size } = req.body;

    if (!productId || !quantity || !size) {
      return res.status(400).json({
        success: false,
        message: "Product ID, quantity, and size are required",
      });
    }

    const cart = await cartService.updateCartItem(
      req.user._id,
      productId,
      quantity,
      size
    );

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;

    if (!productId || !size) {
      return res.status(400).json({
        success: false,
        message: "Product ID and size are required",
      });
    }

    const cart = await cartService.removeFromCart(req.user._id, productId, size);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user._id);

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};