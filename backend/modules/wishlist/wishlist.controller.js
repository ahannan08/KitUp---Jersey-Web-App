import * as wishlistService from "./wishlist.service.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user._id);
    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const wishlist = await wishlistService.addToWishlist(
      req.user._id,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlist,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const wishlist = await wishlistService.removeFromWishlist(
      req.user._id,
      productId
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      data: wishlist,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistService.clearWishlist(req.user._id);

    res.status(200).json({
      success: true,
      message: "Wishlist cleared",
      data: wishlist,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const isInWishlist = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const isInWishlist = await wishlistService.isInWishlist(
      req.user._id,
      productId
    );

    res.status(200).json({
      success: true,
      data: { isInWishlist },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};